import * as th from "astn-typedhandlers-api";
declare type TV = ["onEntry", null] | ["onDictionaryClose", null] | ["onDictionary", null] | ["onGroup", null] | ["onList", null] | ["onMultilineString", null] | ["onSimpleString", null] | ["onTaggedUnion", null] | ["onTypeReference", null] | ["onProperty", null] | ["onUnexpectedProperty", null] | ["onGroupClose", null] | ["onElement", null] | ["onListClose", null] | ["onOption", null] | ["onUnexpectedOption", null] | ["onTaggedUnionEnd", null];
export declare function createLoggingTypedHandler<PAnnotation>(log: (tv: TV) => void): th.ITypedHandler<PAnnotation>;
export {};
