"""
PDF to Word converter using pdf2docx (PyMuPDF + python-docx).
Extracts text, images, tables, and layout from PDF and creates editable DOCX.

Usage:
  python convert_pdf_to_word.py <input.pdf> <output.docx>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import sys
import os


def convert_pdf_to_docx(input_path: str, output_path: str) -> None:
    try:
        from pdf2docx import Converter
        cv = Converter(input_path)
        cv.convert(output_path, start=0, end=None)
        cv.close()
    except ImportError:
        raise RuntimeError("pdf2docx not installed. Run: pip install pdf2docx")
    except Exception as e:
        raise RuntimeError(f"Conversion failed: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_pdf_to_word.py <input.pdf> <output.docx>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        convert_pdf_to_docx(input_file, output_file)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        else:
            print("Conversion produced no output file", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
