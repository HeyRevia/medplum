import { render, screen } from '../test-utils/render';
import { Logo } from './Logo';

describe('Logo', () => {
  test('Renders', () => {
    render(<Logo size={100} />);
    expect(screen.getByAltText('HeyRevia Logo')).toBeDefined();
  });
});
