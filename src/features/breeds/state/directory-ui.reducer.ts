export type DirectoryUIState = {
  input: string;
  query: string;
};

export type DirectoryUIAction =
  | { type: "input/changed"; value: string }
  | { type: "query/committed"; value: string }
  | { type: "search/cleared" };

export function initDirectoryUI(initialQuery: string): DirectoryUIState {
  const query = initialQuery.trim();
  return { input: query, query };
}

export function directoryUIReducer(state: DirectoryUIState, action: DirectoryUIAction): DirectoryUIState {
  switch (action.type) {
    case "input/changed":
      return { ...state, input: action.value };
    case "query/committed": {
      const query = action.value.trim();
      return query === state.query ? state : { ...state, query };
    }
    case "search/cleared":
      return { input: "", query: "" };
  }
}
