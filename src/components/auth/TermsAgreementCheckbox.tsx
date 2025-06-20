import Link from 'next/link';

interface TermsAgreementCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function TermsAgreementCheckbox({
  checked,
  onChange,
  disabled = false,
  className = ''
}: TermsAgreementCheckboxProps) {
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-1 h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
      />
      <label htmlFor="terms" className="text-lg text-gray-700">
        <Link 
          href="/terms" 
          className="text-primary-600 hover:text-primary-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          利用規約
        </Link>
        {' '}と{' '}
        <Link 
          href="/privacy" 
          className="text-primary-600 hover:text-primary-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          プライバシーポリシー
        </Link>
        に同意します
      </label>
    </div>
  );
}