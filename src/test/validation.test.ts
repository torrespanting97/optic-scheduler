import { describe, it, expect } from 'vitest'
import { 
  validateEmail, 
  validatePhone, 
  validateName, 
  validateAddress,
  validateDate,
  formatPhone,
  formatCurrency,
  sanitizeString 
} from '@/lib/validation'

describe('Validation utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate phone numbers with at least 7 digits', () => {
      expect(validatePhone('1234567')).toBe(true)
      expect(validatePhone('(123) 456-7890')).toBe(true)
      expect(validatePhone('+1 234 567 8900')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc')).toBe(false)
    })
  })

  describe('validateName', () => {
    it('should validate names with 2-100 characters', () => {
      expect(validateName('John Doe')).toBe(true)
      expect(validateName('A B')).toBe(true)
    })

    it('should reject names that are too short or too long', () => {
      expect(validateName('A')).toBe(false)
      expect(validateName('a'.repeat(101))).toBe(false)
    })
  })

  describe('validateAddress', () => {
    it('should validate addresses with at least 10 characters', () => {
      expect(validateAddress('123 Main Street')).toBe(true)
    })

    it('should reject short addresses', () => {
      expect(validateAddress('123 Main')).toBe(false)
    })
  })

  describe('validateDate', () => {
    it('should validate future dates', () => {
      const futureDate = new Date(Date.now() + 86400000) // Tomorrow
      expect(validateDate(futureDate)).toBe(true)
    })

    it('should reject past dates', () => {
      const pastDate = new Date(Date.now() - 86400000) // Yesterday
      expect(validateDate(pastDate)).toBe(false)
    })
  })

  describe('formatPhone', () => {
    it('should format 10-digit US phone numbers', () => {
      expect(formatPhone('1234567890')).toBe('(123) 456-7890')
    })

    it('should return original for non-standard formats', () => {
      expect(formatPhone('123')).toBe('123')
    })
  })

  describe('formatCurrency', () => {
    it('should format numbers as USD currency', () => {
      expect(formatCurrency(100)).toBe('$100.00')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })
  })

  describe('sanitizeString', () => {
    it('should trim and normalize whitespace', () => {
      expect(sanitizeString('  hello   world  ')).toBe('hello world')
      expect(sanitizeString('test\n\nstring')).toBe('test string')
    })
  })
})
