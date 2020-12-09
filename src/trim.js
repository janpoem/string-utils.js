/**
 * default white space char list
 *
 *    @see http://php.net/manual/en/function.trim.php
 *
 *    " " (ASCII 32 (0x20)), an ordinary space.
 *    "\t" (ASCII 9 (0x09)), a tab.
 *    "\n" (ASCII 10 (0x0A)), a new line (line feed).
 *    "\r" (ASCII 13 (0x0D)), a carriage return.
 *    "\0" (ASCII 0 (0x00)), the NUL-byte.
 *    "\x0B" (ASCII 11 (0x0B)), a vertical tab.
 */
const DefaultWhitespace = [
  ' ',
  '\t',
  '\n',
  '\r',
  '\0',
  '\v',
  '\f',
  '\x0b',
  '\xa0',
  '\u2000',
  '\u2001',
  '\u2002',
  '\u2003',
  '\u2004',
  '\u2005',
  '\u2006',
  '\u2007',
  '\u2008',
  '\u2009',
  '\u200a',
  '\u200b',
  '\u2028',
  '\u2029',
  '\u3000'
].join('');

