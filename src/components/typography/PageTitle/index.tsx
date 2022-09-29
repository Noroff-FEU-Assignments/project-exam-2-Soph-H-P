import { StyledTitle } from './index.styled';

/**
 * Creates a h1 for the page
 *
 * @param {string} children
 *
 * @example <PageTitle>This is a nice example title</PageTitle>
 * @returns {React.ReactElement}
 */

const PageTitle = ({ children }: { children: string }): React.ReactElement => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default PageTitle;
