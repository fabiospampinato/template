
/* MAIN */

type VariableBoolean = {
  type: 'boolean',
  default?: boolean
};

type VariableString = {
  type: 'string',
  default?: string
};

type Variable = (
  VariableBoolean |
  VariableString
);

type MetadataGlobal = {
  templates?: Record<string, MetadataLocal>
};

type MetadataLocal = {
  delimiters?: {
    start: string,
    end: string
  },
  variables?: Record<string, Variable>
};

/* EXPORT */

export type {MetadataGlobal, MetadataLocal};
