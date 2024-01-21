class dtPassword {
  value: string;

  constructor(value: string) {
    const rules = dtPassword.checkRules(value);

    if (Object.values(rules).includes(false)) {
      throw new Error('Invalid password');
    }

    this.value = value;
  }

  static checkRules(value: string): Record<string, boolean> {
    const results: Record<string, boolean> = {
      size: /^.{14,30}$/.test(value),
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[^\w\s]/.test(value),
    };

    return results;
  }
}

export default dtPassword;
