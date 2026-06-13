"""
Word to PDF converter.
Supports both Windows (docx2pdf / MS Word) and Linux (LibreOffice).

Usage:
  python convert_word.py <input.docx|.doc> <output.pdf>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import sys
import os
import subprocess


def convert_via_libreoffice(input_path: str, output_dir: str) -> str:
    """Convert Word to PDF using LibreOffice (Linux / cross-platform)."""
    result = subprocess.run(
        [
            "libreoffice",
            "--headless",
            "--convert-to", "pdf",
            "--outdir", output_dir,
            input_path,
        ],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode != 0:
        raise RuntimeError(f"LibreOffice conversion failed: {result.stderr.strip()}")
    base = os.path.splitext(os.path.basename(input_path))[0]
    pdf_path = os.path.join(output_dir, base + ".pdf")
    if not os.path.exists(pdf_path):
        raise RuntimeError("LibreOffice did not produce output")
    return pdf_path


def convert_via_docx2pdf(input_path: str, output_path: str) -> None:
    """Convert Word to PDF using docx2pdf (MS Word API on Windows)."""
    try:
        from docx2pdf import convert as dc
        dc(input_path, output_path)
    except ImportError:
        raise RuntimeError("docx2pdf not installed. Run: pip install docx2pdf")
    except Exception as e:
        raise RuntimeError(f"Conversion failed: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_word.py <input.docx> <output.pdf>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        # Try LibreOffice first (works on Linux, macOS, Windows if installed)
        import shutil
        if shutil.which("libreoffice"):
            output_dir = os.path.dirname(output_file) or "."
            pdf_path = convert_via_libreoffice(input_file, output_dir)
            if pdf_path != output_file:
                os.rename(pdf_path, output_file)
        else:
            # Fallback to docx2pdf (Windows only, requires MS Word)
            convert_via_docx2pdf(input_file, output_file)

        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        print("Conversion produced no output file", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
