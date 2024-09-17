export type CyComponentInput<T> = Partial<{ [P in keyof T]: T[P] }>;
