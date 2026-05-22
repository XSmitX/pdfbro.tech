"""
PDF Password Removal using PyMuPDF (fitz).
Removes password protection from PDF files.

Usage:
  python unlock_pdf.py <input.pdf> <output.pdf> <password>

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
        
        # Open the PDF
        doc = fitz.open(input_path)
        
        # Try to authenticate with the provided password
        if doc.needs_pass:
            if not doc.authenticate(password):
                raise ValueError("Incorrect password provided.")
        
        # Save the document without encryption
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
    if len(sys.argv) < 4:
        print("Usage: python unlock_pdf.py <input.pdf> <output.pdf> <password>", file=sys.stderr)
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    password = sys.argv[3]
    
    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)
    
    try:
        unlock_pdf(input_file, output_file, password)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        else:
            print("Unlocking produced no output file", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
