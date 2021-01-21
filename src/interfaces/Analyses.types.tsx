export type TagsTableData = [string, number] | undefined;

export enum LoadingState {
    Idle,
    Loading,
    Loaded,
    Error,
    Empty
};