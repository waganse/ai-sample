import { render, screen } from '@testing-library/react';
import HomePage from '../page';

// Mock useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

describe('HomePage', () => {
  it('renders the hero section', () => {
    render(<HomePage />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('私たちの想いを知る')).toBeInTheDocument();
    expect(screen.getByText('サービス詳細')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<HomePage />);
    
    expect(screen.getByText('私たちの想いを知る')).toBeInTheDocument();
    expect(screen.getByText('サービス詳細')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<HomePage />);
    
    expect(screen.getByText('真剣な出会い')).toBeInTheDocument();
    expect(screen.getByText('活発なコミュニティ')).toBeInTheDocument();
    expect(screen.getByText('安心・安全')).toBeInTheDocument();
  });

  it('renders statistics section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('1,200+')).toBeInTheDocument();
    expect(screen.getByText('アクティブユーザー')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('活発なコミュニティ')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('ユーザー満足度')).toBeInTheDocument();
  });

  it('renders CTA section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('新しい人生の章を、今から始めませんか？')).toBeInTheDocument();
    expect(screen.getByText('無料で始める')).toBeInTheDocument();
    expect(screen.getByText('想いを知る')).toBeInTheDocument();
  });
});