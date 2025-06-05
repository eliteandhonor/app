
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  icon: string;
  popular?: boolean;
  keywords: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'calculators',
    name: 'Calculators',
    description: 'Essential calculation tools for everyday math',
    path: '/calculators',
    icon: 'Calculator',
    color: 'bg-blue-500'
  },
  {
    id: 'converters',
    name: 'Converters',
    description: 'Convert between different units and formats',
    path: '/converters',
    icon: 'ArrowLeftRight',
    color: 'bg-green-500'
  },
  {
    id: 'time-tools',
    name: 'Time Tools',
    description: 'Timers, stopwatches, and time utilities',
    path: '/time-tools',
    icon: 'Clock',
    color: 'bg-purple-500'
  },
  {
    id: 'random-fun',
    name: 'Random & Fun',
    description: 'Random generators and fun utilities',
    path: '/random-fun',
    icon: 'Shuffle',
    color: 'bg-orange-500'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    description: 'Productivity tools and text utilities',
    path: '/utilities',
    icon: 'Wrench',
    color: 'bg-indigo-500'
  }
];

export const tools: Tool[] = [
  // Calculators
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and find what percent one number is of another',
    category: 'calculators',
    path: '/calculators/percentage-calculator',
    icon: 'Percent',
    popular: true,
    keywords: ['percentage', 'percent', 'calculate', 'math', 'ratio']
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments and view amortization schedule',
    category: 'calculators',
    path: '/calculators/mortgage-calculator',
    icon: 'Home',
    popular: true,
    keywords: ['mortgage', 'loan', 'payment', 'interest', 'amortization', 'home']
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest growth with interactive charts',
    category: 'calculators',
    path: '/calculators/compound-interest-calculator',
    icon: 'TrendingUp',
    popular: true,
    keywords: ['compound', 'interest', 'investment', 'growth', 'savings', 'chart']
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and health category',
    category: 'calculators',
    path: '/calculators/bmi-calculator',
    icon: 'Activity',
    popular: true,
    keywords: ['bmi', 'body', 'mass', 'index', 'health', 'weight', 'height']
  },
  
  // Converters
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between different length units (cm, inches, feet, meters, etc.)',
    category: 'converters',
    path: '/converters/length-converter',
    icon: 'Ruler',
    popular: true,
    keywords: ['length', 'distance', 'convert', 'cm', 'inches', 'feet', 'meters']
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between different weight units (kg, pounds, ounces, etc.)',
    category: 'converters',
    path: '/converters/weight-converter',
    icon: 'Scale',
    keywords: ['weight', 'mass', 'convert', 'kg', 'pounds', 'ounces', 'grams']
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between currencies with live exchange rates',
    category: 'converters',
    path: '/converters/currency-converter',
    icon: 'DollarSign',
    popular: true,
    keywords: ['currency', 'exchange', 'rate', 'money', 'convert', 'forex']
  },
  {
    id: 'color-converter',
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, HSL formats',
    category: 'converters',
    path: '/converters/color-converter',
    icon: 'Palette',
    keywords: ['color', 'picker', 'hex', 'rgb', 'hsl', 'palette', 'design']
  },
  
  // Time Tools
  {
    id: 'stopwatch-timer',
    name: 'Stopwatch & Timer',
    description: 'Precise stopwatch with lap times and countdown timer',
    category: 'time-tools',
    path: '/time-tools/stopwatch-timer',
    icon: 'Timer',
    popular: true,
    keywords: ['stopwatch', 'timer', 'countdown', 'lap', 'time', 'alarm']
  },
  
  // Random & Fun
  {
    id: 'random-number-picker',
    name: 'Random Number & Name Picker',
    description: 'Generate random numbers and pick random names from lists',
    category: 'random-fun',
    path: '/random-fun/random-number-picker',
    icon: 'Dices',
    keywords: ['random', 'number', 'name', 'picker', 'generator', 'lottery']
  },

  // New Calculator Tools
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from birthdate with years, months, and days',
    category: 'calculators',
    path: '/calculators/age-calculator',
    icon: 'Calendar',
    popular: true,
    keywords: ['age', 'birthday', 'birthdate', 'years', 'months', 'days', 'calculate']
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills with customizable tip percentages',
    category: 'calculators',
    path: '/calculators/tip-calculator',
    icon: 'Receipt',
    popular: true,
    keywords: ['tip', 'bill', 'split', 'restaurant', 'service', 'percentage', 'gratuity']
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate loan payments, interest, and amortization schedules',
    category: 'calculators',
    path: '/calculators/loan-calculator',
    icon: 'CreditCard',
    keywords: ['loan', 'payment', 'interest', 'amortization', 'finance', 'debt']
  },
  {
    id: 'grade-calculator',
    name: 'Grade Calculator',
    description: 'Calculate weighted grades and GPA with multiple assignments',
    category: 'calculators',
    path: '/calculators/grade-calculator',
    icon: 'GraduationCap',
    keywords: ['grade', 'gpa', 'weighted', 'assignment', 'school', 'education', 'average']
  },

  // New Converter Tools
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin temperatures',
    category: 'converters',
    path: '/converters/temperature-converter',
    icon: 'Thermometer',
    popular: true,
    keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'convert', 'weather']
  },
  {
    id: 'area-converter',
    name: 'Area & Volume Converter',
    description: 'Convert between area and volume units (sq ft, acres, liters, etc.)',
    category: 'converters',
    path: '/converters/area-converter',
    icon: 'Square',
    keywords: ['area', 'volume', 'square', 'feet', 'meters', 'acres', 'liters', 'gallons']
  },

  // New Time Tools
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones worldwide',
    category: 'time-tools',
    path: '/time-tools/timezone-converter',
    icon: 'Globe',
    popular: true,
    keywords: ['timezone', 'time', 'zone', 'convert', 'world', 'clock', 'utc']
  },

  // New Utility Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable length and complexity',
    category: 'utilities',
    path: '/utilities/password-generator',
    icon: 'Key',
    popular: true,
    keywords: ['password', 'generator', 'secure', 'random', 'strong', 'security']
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text, URLs, and other data',
    category: 'utilities',
    path: '/utilities/qr-code-generator',
    icon: 'QrCode',
    popular: true,
    keywords: ['qr', 'code', 'generator', 'barcode', 'scan', 'url', 'text']
  },
  {
    id: 'text-analyzer',
    name: 'Text Counter & Analyzer',
    description: 'Count words, characters, paragraphs and analyze text statistics',
    category: 'utilities',
    path: '/utilities/text-analyzer',
    icon: 'FileText',
    keywords: ['text', 'counter', 'words', 'characters', 'analyzer', 'statistics', 'writing']
  },

  // Additional Calculator Tools
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discounts, sale prices, and savings amounts',
    category: 'calculators',
    path: '/calculators/discount-calculator',
    icon: 'Tag',
    popular: true,
    keywords: ['discount', 'sale', 'price', 'savings', 'percentage', 'off', 'coupon']
  },
  {
    id: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    description: 'Calculate sales tax and total price with tax included',
    category: 'calculators',
    path: '/calculators/sales-tax-calculator',
    icon: 'Receipt',
    keywords: ['sales', 'tax', 'vat', 'price', 'total', 'calculate', 'inclusive']
  },
  {
    id: 'unit-price-calculator',
    name: 'Unit Price Comparison',
    description: 'Compare unit prices to find the best value between products',
    category: 'calculators',
    path: '/calculators/unit-price-calculator',
    icon: 'ShoppingCart',
    keywords: ['unit', 'price', 'comparison', 'value', 'cost', 'per', 'shopping']
  },
  {
    id: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    description: 'Calculate fuel costs for trips based on distance and fuel efficiency',
    category: 'calculators',
    path: '/calculators/fuel-cost-calculator',
    icon: 'Fuel',
    keywords: ['fuel', 'gas', 'cost', 'trip', 'distance', 'mpg', 'efficiency', 'travel']
  },

  // Additional Converter Tools
  {
    id: 'base64-converter',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode text to/from Base64 format',
    category: 'converters',
    path: '/converters/base64-converter',
    icon: 'Code',
    popular: true,
    keywords: ['base64', 'encode', 'decode', 'text', 'binary', 'conversion']
  },
  {
    id: 'url-converter',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe transmission',
    category: 'converters',
    path: '/converters/url-converter',
    icon: 'Link',
    keywords: ['url', 'encode', 'decode', 'percent', 'encoding', 'uri', 'web']
  },
  {
    id: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    description: 'Convert between Roman numerals and decimal numbers',
    category: 'converters',
    path: '/converters/roman-numeral-converter',
    icon: 'Columns',
    keywords: ['roman', 'numeral', 'convert', 'decimal', 'number', 'ancient']
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert between binary, decimal, hexadecimal, and octal number systems',
    category: 'converters',
    path: '/converters/number-base-converter',
    icon: 'Binary',
    keywords: ['binary', 'decimal', 'hexadecimal', 'octal', 'base', 'convert', 'programming']
  },

  // Additional Utility Tools
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256 hashes from text input',
    category: 'utilities',
    path: '/utilities/hash-generator',
    icon: 'Hash',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'checksum', 'security', 'encryption']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter/Validator',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    category: 'utilities',
    path: '/utilities/json-formatter',
    icon: 'Braces',
    popular: true,
    keywords: ['json', 'format', 'validate', 'beautify', 'syntax', 'data', 'api']
  },
  {
    id: 'markdown-converter',
    name: 'Markdown to HTML Converter',
    description: 'Convert Markdown text to HTML with live preview',
    category: 'utilities',
    path: '/utilities/markdown-converter',
    icon: 'FileCode',
    keywords: ['markdown', 'html', 'convert', 'preview', 'text', 'formatting', 'documentation']
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    description: 'Generate various types of barcodes from text or numbers',
    category: 'utilities',
    path: '/utilities/barcode-generator',
    icon: 'ScanLine',
    keywords: ['barcode', 'generator', 'code128', 'ean', 'upc', 'scan', 'product']
  },

  // Additional New Tools
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design and development projects',
    category: 'utilities',
    path: '/utilities/lorem-ipsum-generator',
    icon: 'Type',
    popular: true,
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generator', 'design', 'dummy']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs) in various formats',
    category: 'utilities',
    path: '/utilities/uuid-generator',
    icon: 'Fingerprint',
    popular: true,
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generator', 'random']
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and validate regular expressions with real-time matching',
    category: 'utilities',
    path: '/utilities/regex-tester',
    icon: 'Search',
    keywords: ['regex', 'regular', 'expression', 'pattern', 'test', 'match', 'validation']
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes and schemes for design projects',
    category: 'converters',
    path: '/converters/color-palette-generator',
    icon: 'Palette',
    popular: true,
    keywords: ['color', 'palette', 'scheme', 'generator', 'design', 'harmony', 'complementary']
  },
  {
    id: 'gradient-generator',
    name: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients with live preview and code export',
    category: 'utilities',
    path: '/utilities/gradient-generator',
    icon: 'Paintbrush',
    keywords: ['gradient', 'css', 'linear', 'radial', 'generator', 'design', 'background']
  },
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases: upper, lower, title, camel, snake',
    category: 'converters',
    path: '/converters/case-converter',
    icon: 'Type',
    popular: true,
    keywords: ['case', 'convert', 'upper', 'lower', 'title', 'camel', 'snake', 'text']
  },
  {
    id: 'slug-generator',
    name: 'URL Slug Generator',
    description: 'Generate SEO-friendly URL slugs from text input',
    category: 'utilities',
    path: '/utilities/slug-generator',
    icon: 'Link2',
    keywords: ['slug', 'url', 'seo', 'generator', 'permalink', 'friendly', 'web']
  },
  {
    id: 'email-validator',
    name: 'Email Validator',
    description: 'Validate email addresses and check format correctness',
    category: 'utilities',
    path: '/utilities/email-validator',
    icon: 'Mail',
    keywords: ['email', 'validator', 'validation', 'check', 'format', 'verify']
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    category: 'time-tools',
    path: '/time-tools/timestamp-converter',
    icon: 'Clock',
    popular: true,
    keywords: ['timestamp', 'unix', 'epoch', 'date', 'time', 'convert', 'milliseconds']
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier & Beautifier',
    description: 'Minify or beautify CSS code for optimization and readability',
    category: 'utilities',
    path: '/utilities/css-minifier',
    icon: 'Code2',
    keywords: ['css', 'minify', 'beautify', 'compress', 'optimize', 'format', 'stylesheet']
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier & Beautifier',
    description: 'Minify or beautify HTML code for optimization and readability',
    category: 'utilities',
    path: '/utilities/html-minifier',
    icon: 'FileCode',
    keywords: ['html', 'minify', 'beautify', 'compress', 'optimize', 'format', 'markup']
  },
  {
    id: 'js-minifier',
    name: 'JavaScript Minifier & Beautifier',
    description: 'Minify or beautify JavaScript code for optimization and readability',
    category: 'utilities',
    path: '/utilities/js-minifier',
    icon: 'Braces',
    keywords: ['javascript', 'js', 'minify', 'beautify', 'compress', 'optimize', 'format']
  },
  {
    id: 'text-diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight differences line by line',
    category: 'utilities',
    path: '/utilities/text-diff-checker',
    icon: 'GitCompare',
    keywords: ['diff', 'compare', 'text', 'difference', 'merge', 'changes', 'version']
  },
  {
    id: 'word-frequency-counter',
    name: 'Word Frequency Counter',
    description: 'Analyze text and count word frequency with detailed statistics',
    category: 'utilities',
    path: '/utilities/word-frequency-counter',
    icon: 'BarChart3',
    keywords: ['word', 'frequency', 'count', 'statistics', 'analysis', 'text', 'occurrence']
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64 Converter',
    description: 'Convert images to Base64 encoded strings for embedding in code',
    category: 'converters',
    path: '/converters/image-to-base64',
    icon: 'Image',
    keywords: ['image', 'base64', 'convert', 'encode', 'embed', 'data', 'uri']
  }
];

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return tools.filter(tool => tool.category === categoryId);
};

export const getPopularTools = (): Tool[] => {
  return tools.filter(tool => tool.popular);
};

export const searchTools = (query: string): Tool[] => {
  if (!query.trim()) return tools;
  
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
