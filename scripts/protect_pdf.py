"""
PDF Password Protection using PyMuPDF (fitz).
Adds password protection to PDF files.

Usage:
  python protect_pdf.py <input.pdf> <output.pdf> <user_password>

Exit codes:
  0 - success (prints SUCCESS:<output_path>)
  1 - error (message printed to stderr)
"""

import sys
import os
import tempfile
import json


def protect_pdf(input_path: str, output_path: str, user_password: str, owner_password: str = None) -> None:
    """Add password protection to a PDF file."""
    try:
        import fitz  # PyMuPDF
        
        # Open the PDF
        doc = fitz.open(input_path)
        
        # Create password protection options
        # user_password: required to open the PDF
        # owner_password: for full access (permissions changes)
        # If no owner password provided, use same as user password
        owner_pwd = owner_password if owner_password else user_password
        
        # PyMuPDF save() with encryption takes permissions as an integer (bit flags)
        # Bit 0 (value 1): Print low resolution
        # Bit 1 (value 2): Modify contents (copy, edit, etc.)
        # Bit 2 (value 4): Copy text
        # Bit 3 (value 8): Add annotations
        # Bit 4 (value 16): Fill form fields
        # Bit 5 (value 32): Extract for accessibility
        # Bit 6 (value 64): Document assembly
        # Bit 7 (value 128): Print high resolution
        # Default: -1 (all permissions), 0 (no permissions)
        
        # For protection: we want to restrict modification, copying, annotation
        # Allow: printing (low res = bit 0), accessibility (bit 5)
        # Value = 1 + 32 = 33
        
        # Save with encryption using keyword arguments
        # PyMuPDF v1.23+ uses: user_pw, owner_pw, permissions, algorithm
        doc.save(
            output_path,
            encryption=fitz.PDF_ENCRYPT_AES_128,
            user_pw=user_password,
            owner_pw=owner_pwd,
            permissions=33,  # Allow print low res + accessibility only
        )
        
        doc.close()
        
    except ImportError:
        raise RuntimeError("PyMuPDF not installed. Run: pip install PyMuPDF")
    except Exception as e:
        raise RuntimeError(f"Protection failed: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python protect_pdf.py <input.pdf> <output.pdf> <user_password> [owner_password]", file=sys.stderr)
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    user_password = sys.argv[3]
    owner_password = sys.argv[4] if len(sys.argv) > 4 else None
    
    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}", file=sys.stderr)
        sys.exit(1)
    
    try:
        protect_pdf(input_file, output_file, user_password, owner_password)
        if os.path.exists(output_file):
            print(f"SUCCESS:{output_file}")
            sys.exit(0)
        else:
            print("Protection produced no output file", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
