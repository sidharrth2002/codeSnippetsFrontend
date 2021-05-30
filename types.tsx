/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  AddSnippet: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface UserInterface {
  __typename: string,
  name: string,
  email: string,
  accessToken: string
}

export interface LoginInput {
  email: string;
  password: string;  
}

export interface UserData {
  id: number,
  name: string,
  email: string,
  accessToken: string
}

export interface QuoteInterface {
  quote: string,
  author: string
}

export interface Snippets {
  id: string;
  title: string;
  description: string;
  snippet: string;
  comments: string[];
}

export interface SnippetsList {
  snippetsForUser: Snippets[];
}

export interface SnippetsSearchResults {
  snippetsByKeyword: Snippets[];
}

export interface SnippetsQueryInput {
  userId: number;
}

export interface ItemProps {
  title: string;
  description: string;
  snippet: string;
  comments: string[]
}

export interface FeedState {
  activeIndex: number;
  carouselItems: ItemProps[];
}

export interface QuoteInterface {
  quote: string,
  author: string
}

export interface FeedProps {
  snippets: Snippets[],
  setModalToShow: Function
}

export interface AddSnippetData {
  title: string;
  description: string;
  snippet: string;
  userId: string;
}

export interface DeleteSnippetData {
  id: string;
}

export interface DeleteSnippetResult {
  deleteSnippet: boolean;
}