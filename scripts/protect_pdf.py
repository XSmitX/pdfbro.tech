"""
PDF Password Protection using PyMuPDF (fitz).
Adds password protection to PDF files.

Passwords are passed via environment variables to avoid
exposure in the process list (ps aux).

Environment variables:
  PDFBRO_USER_PASSWORD  — required, password to open PDF
  PDFBRO_OWNER_PASSWORD — optional, owner password

Usage:
  PDFBRO_USER_PASSWORD=secret python protect_pdf.py <input.pdf> <output.pdf>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import sys
import os

def protect_pdf(input_path: str, output_path: str, user_password: str, owner_password: str = None) -> None:
    """Add password protection to a PDF file."""
    try:
        import fitz  # PyMuPDF

        doc = fitz.open(input_path)

        owner_pwd = owner_password if owner_password else user_password

        doc.save(
            output_path,
            encryption=fitz.PDF_ENCRYPT_AES_128,
            user_pw=user_password,
            owner_pw=owner_pwd,
            permissions=33,
        )

        doc.close()

    except ImportError:
        raise RuntimeError("PyMuPDF not installed. Run: pip install PyMuPDF")
    except Exception as e:
        raise RuntimeError(f"Protection failed: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: PDFBRO_USER_PASSWORD=<pwd> python protect_pdf.py <input.pdf> <output.pdf>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    user_password = os.environ.get("PDFBRO_USER_PASSWORD", "")
    owner_password = os.environ.get("PDFBRO_OWNER_PASSWORD") or None

    if not user_password:
        print("Error: PDFBRO_USER_PASSWORD environment variable is required", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)

    try:
        protect_pdf(input_file, output_file, user_password, owner_password)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        print("Protection produced no output file", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
