"use client";

// ============================================================
// useFileUpload — Drag & drop + file selection hook
// ============================================================

import { useState, useCallback, useRef } from "react";
import type { UploadedFile } from "@/lib/types";
import { generateId, formatBytes } from "@/lib/utils";

interface UseFileUploadOptions {
  acceptedTypes: string;
  multiple?: boolean;
  maxFileSize?: number; // bytes
  maxFiles?: number;
  onFilesAdded?: (files: UploadedFile[]) => void;
  onError?: (error: string) => void;
}

interface UseFileUploadReturn {
  files: UploadedFile[];
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  addFiles: (newFiles: FileList | File[]) => void;
  removeFile: (id: string) => void;
  reorderFiles: (fromIndex: number, toIndex: number) => void;
  clearFiles: () => void;
  openFilePicker: () => void;
  dropZoneProps: {
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onClick: () => void;
  };
  error: string | null;
}

export function useFileUpload(options: UseFileUploadOptions): UseFileUploadReturn {
  const {
    acceptedTypes,
    multiple = false,
    maxFileSize = 0,
    maxFiles = 0,
    onFilesAdded,
    onError,
  } = options;

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragCounterRef = useRef(0);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      if (acceptedTypes && acceptedTypes !== "*") {
        const accepted = acceptedTypes.split(",").map((t) => t.trim());
        const isValid = accepted.some((type) => {
          if (type === "image/*") return file.type.startsWith("image/");
          if (type === "application/pdf,image/*")
            return file.type === "application/pdf" || file.type.startsWith("image/");
          return (
            file.type === type ||
            file.name.toLowerCase().endsWith(type.replace(".", ""))
          );
        });
        if (!isValid) {
          return `"${file.name}" is not an accepted file type.`;
        }
      }

      // Check file size
      if (maxFileSize > 0 && file.size > maxFileSize) {
        return `"${file.name}" exceeds the maximum size of ${formatBytes(maxFileSize)}.`;
      }

      return null;
    },
    [acceptedTypes, maxFileSize]
  );

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      setError(null);

      // Check max files limit
      if (maxFiles > 0) {
        const remaining = maxFiles - files.length;
        if (remaining <= 0) {
          const msg = `Maximum ${maxFiles} files allowed.`;
          setError(msg);
          onError?.(msg);
          return;
        }
        // Slice to remaining slots
        fileArray.splice(remaining);
      }

      // If not multiple, replace existing
      if (!multiple) {
        fileArray.splice(1); // Only take first file
      }

      const validFiles: UploadedFile[] = [];

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          onError?.(validationError);
          continue;
        }

        const uploadedFile: UploadedFile = {
          id: generateId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: "idle",
          progress: 0,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        };

        validFiles.push(uploadedFile);
      }

      if (validFiles.length > 0) {
        setFiles((prev) =>
          multiple ? [...prev, ...validFiles] : validFiles
        );
        onFilesAdded?.(validFiles);
      }
    },
    [files.length, maxFiles, multiple, validateFile, onFilesAdded, onError]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
    setError(null);
  }, []);

  const reorderFiles = useCallback((fromIndex: number, toIndex: number) => {
    setFiles((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const clearFiles = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      return [];
    });
    setError(null);
  }, []);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const dropZoneProps = {
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onDragLeave: (e: React.DragEvent) => {
      e.preventDefault();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) setIsDragging(false);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    onClick: openFilePicker,
  };

  // Fix drag enter on nested children
  const originalOnDragOver = dropZoneProps.onDragOver;
  dropZoneProps.onDragOver = (e: React.DragEvent) => {
    originalOnDragOver(e);
    dragCounterRef.current++;
    setIsDragging(true);
  };

  return {
    files,
    isDragging,
    inputRef,
    addFiles,
    removeFile,
    reorderFiles,
    clearFiles,
    openFilePicker,
    dropZoneProps,
    error,
  };
}
