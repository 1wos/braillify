use unicode_normalization::UnicodeNormalization;

const FRACTION_SLASH: char = '\u{2044}';

fn consume_whitespace(iter: &mut std::iter::Peekable<std::str::Chars>) {
    while let Some(c) = iter.peek() {
        if c.is_whitespace() {
            iter.next();
        } else {
            break;
        }
    }
}

fn encode_number_string(s: &str, part_name: &str) -> Result<Vec<u8>, String> {
    let mut result = Vec::new();
    for c in s.chars() {
        if !c.is_ascii_digit() {
            return Err(format!("Invalid {} part (non-ascii digit): {}", part_name, c));
        }
        result.extend(crate::number::encode_number(c));
    }
    Ok(result)
}

pub fn encode_fraction(numerator: &str, denominator: &str) -> Result<Vec<u8>, String> {
    let mut result = vec![60];
    result.extend(encode_number_string(denominator, "fraction denominator")?);
    result.push(12);
    result.push(60);
    result.extend(encode_number_string(numerator, "fraction numerator")?);
    Ok(result)
}

pub fn encode_fraction_in_context(numerator: &str, denominator: &str) -> Result<Vec<u8>, String> {
    let mut result = vec![60];
    result.extend(encode_number_string(numerator, "fraction numerator")?);
    result.push(56);
    result.push(12);
    result.push(60);
    result.extend(encode_number_string(denominator, "fraction denominator")?);
    Ok(result)
}

pub fn encode_mixed_fraction(whole: &str, numerator: &str, denominator: &str) -> Result<Vec<u8>, String> {
    let mut result = vec![60];
    result.extend(encode_number_string(whole, "whole number")?);
    result.extend(encode_fraction(numerator, denominator)?);
    Ok(result)
}

fn normalize_digit(c: char) -> Option<char> {
    match c {
        '0' | '⁰' | '₀' => Some('0'),
        '1' | '¹' | '₁' => Some('1'),
        '2' | '²' | '₂' => Some('2'),
        '3' | '³' | '₃' => Some('3'),
        '4' | '⁴' | '₄' => Some('4'),
        '5' | '⁵' | '₅' => Some('5'),
        '6' | '⁶' | '₆' => Some('6'),
        '7' | '⁷' | '₇' => Some('7'),
        '8' | '⁸' | '₈' => Some('8'),
        '9' | '⁹' | '₉' => Some('9'),
        _ => None,
    }
}

fn read_braced_content(
    iter: &mut std::iter::Peekable<std::str::Chars>
) -> Option<String> {
    consume_whitespace(iter);
    
    if iter.next()? != '{' { return None; }

    let mut content = String::new();
    while let Some(c) = iter.peek() {
        match c {
            '}' => {
                iter.next();
                return if content.is_empty() { None } else { Some(content) };
            }
            _ if c.is_whitespace() => {
                iter.next();
            }
            _ => {
                if let Some(digit) = normalize_digit(*c) {
                    content.push(digit);
                    iter.next();
                } else {
                    return None;
                }
            }
        }
    }
    None
}

pub fn parse_latex_fraction(s: &str) -> Option<(Option<String>, String, String)> {
    let mut iter = s.trim().chars().peekable();

    if iter.next()? != '$' { return None; }

    consume_whitespace(&mut iter);

    let mut whole_part_str = String::new();
    while let Some(digit) = iter.peek().and_then(|c| normalize_digit(*c)) {
        whole_part_str.push(digit);
        iter.next();
    }
    let whole_part = if whole_part_str.is_empty() { None } else { Some(whole_part_str) };

    consume_whitespace(&mut iter);
    
    if iter.next() != Some('\\') ||
       iter.next() != Some('f') ||
       iter.next() != Some('r') ||
       iter.next() != Some('a') ||
       iter.next() != Some('c') {
        return None;
    }

    let numerator = read_braced_content(&mut iter)?;
    let denominator = read_braced_content(&mut iter)?;

    consume_whitespace(&mut iter);
    
    if iter.next()? != '$' { return None; }

    consume_whitespace(&mut iter);
    
    if iter.next().is_some() {
        return None;
    }

    Some((whole_part, numerator, denominator))
}

pub fn parse_unicode_fraction(c: char) -> Option<(String, String)> {
    let decomposed = c.nfkd().collect::<String>();
    if !decomposed.contains(FRACTION_SLASH) {
        return None;
    }

    let parts: Vec<&str> = decomposed.split(FRACTION_SLASH).collect();

    if parts.len() == 2 {
        let num_str = parts[0].trim();
        let den_str = parts[1].trim();
        if num_str.is_empty() || den_str.is_empty() {
            return None;
        }
        if !num_str.chars().all(|c| c.is_ascii_digit()) {
            return None; 
        }
        if !den_str.chars().all(|c| c.is_ascii_digit()) {
            return None; 
        }
        Some((num_str.to_string(), den_str.to_string()))
    } else {
        None
    }
}

pub fn is_unicode_fraction(c: char) -> bool {
  parse_unicode_fraction(c).is_some()
}