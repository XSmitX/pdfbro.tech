"""
PDF Password Removal using PyMuPDF (fitz).
Removes password protection from PDF files.

Password is passed via environment variable to avoid
exposure in the process list (ps aux).

Environment variables:
  PDFBRO_PASSWORD — required, current PDF password

Usage:
  PDFBRO_PASSWORD=secret python unlock_pdf.py <input.pdf> <output.pdf>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import sys
import os

def unlock_pdf(input_path: str, output_path: str, password: str) -> None:
    """Remove password protection from a PDF file."""
    try:
        import fitz  # PyMuPDF

        doc = fitz.open(input_path)

        if doc.needs_pass:
            if not doc.authenticate(password):
                raise ValueError("Incorrect password provided.")

        doc.save(
            output_path,
            garbage=4,
            deflate=True,
            clean=True
        )

        doc.close()

    except ImportError:
        raise RuntimeError("PyMuPDF not installed. Run: pip install PyMuPDF")
    except Exception as e:
        raise RuntimeError(f"Unlocking failed: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: PDFBRO_PASSWORD=<pwd> python unlock_pdf.py <input.pdf> <output.pdf>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    password = os.environ.get("PDFBRO_PASSWORD", "")

    if not password:
        print("Error: PDFBRO_PASSWORD environment variable is required", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        unlock_pdf(input_file, output_file, password)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        print("Unlocking produced no output file", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
