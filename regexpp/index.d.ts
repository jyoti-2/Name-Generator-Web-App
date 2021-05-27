// Generated by dts-bundle v0.7.3

declare module 'regexpp' {
    import * as AST from "regexpp/ast";
    import { RegExpParser } from "regexpp/parser";
    import { RegExpValidator } from "regexpp/validator";
    import { RegExpVisitor } from "regexpp/visitor";
    export { AST, RegExpParser, RegExpValidator };
    export function parseRegExpLiteral(source: string | RegExp, options?: RegExpParser.Options): AST.RegExpLiteral;
    export function validateRegExpLiteral(source: string, options?: RegExpValidator.Options): void;
    export function visitRegExpAST(node: AST.Node, handlers: RegExpVisitor.Handlers): void;
}

declare module 'regexpp/ast' {
    export type Node = BranchNode | LeafNode;
    export type BranchNode = RegExpLiteral | Pattern | Alternative | Group | CapturingGroup | Quantifier | CharacterClass | LookaroundAssertion | CharacterClassRange;
    export type LeafNode = BoundaryAssertion | CharacterSet | Character | Backreference | Flags;
    export type Element = Assertion | Quantifier | QuantifiableElement;
    export type QuantifiableElement = Group | CapturingGroup | CharacterClass | CharacterSet | Character | Backreference | LookaheadAssertion;
    export type CharacterClassElement = EscapeCharacterSet | UnicodePropertyCharacterSet | Character | CharacterClassRange;
    export interface NodeBase {
        type: Node["type"];
        parent: Node["parent"];
        start: number;
        end: number;
        raw: string;
    }
    export interface RegExpLiteral extends NodeBase {
        type: "RegExpLiteral";
        parent: null;
        pattern: Pattern;
        flags: Flags;
    }
    export interface Pattern extends NodeBase {
        type: "Pattern";
        parent: RegExpLiteral | null;
        alternatives: Alternative[];
    }
    export interface Alternative extends NodeBase {
        type: "Alternative";
        parent: Pattern | Group | CapturingGroup | LookaroundAssertion;
        elements: Element[];
    }
    export interface Group extends NodeBase {
        type: "Group";
        parent: Alternative | Quantifier;
        alternatives: Alternative[];
    }
    export interface CapturingGroup extends NodeBase {
        type: "CapturingGroup";
        parent: Alternative | Quantifier;
        name: string | null;
        alternatives: Alternative[];
        references: Backreference[];
    }
    export type LookaroundAssertion = LookaheadAssertion | LookbehindAssertion;
    export interface LookaheadAssertion extends NodeBase {
        type: "Assertion";
        parent: Alternative | Quantifier;
        kind: "lookahead";
        negate: boolean;
        alternatives: Alternative[];
    }
    export interface LookbehindAssertion extends NodeBase {
        type: "Assertion";
        parent: Alternative;
        kind: "lookbehind";
        negate: boolean;
        alternatives: Alternative[];
    }
    export interface Quantifier extends NodeBase {
        type: "Quantifier";
        parent: Alternative;
        min: number;
        max: number;
        greedy: boolean;
        element: QuantifiableElement;
    }
    export interface CharacterClass extends NodeBase {
        type: "CharacterClass";
        parent: Alternative | Quantifier;
        negate: boolean;
        elements: CharacterClassElement[];
    }
    export interface CharacterClassRange extends NodeBase {
        type: "CharacterClassRange";
        parent: CharacterClass;
        min: Character;
        max: Character;
    }
    export type Assertion = BoundaryAssertion | LookaroundAssertion;
    export type BoundaryAssertion = EdgeAssertion | WordBoundaryAssertion;
    export interface EdgeAssertion extends NodeBase {
        type: "Assertion";
        parent: Alternative | Quantifier;
        kind: "start" | "end";
    }
    export interface WordBoundaryAssertion extends NodeBase {
        type: "Assertion";
        parent: Alternative | Quantifier;
        kind: "word";
        negate: boolean;
    }
    export type CharacterSet = AnyCharacterSet | EscapeCharacterSet | UnicodePropertyCharacterSet;
    export interface AnyCharacterSet extends NodeBase {
        type: "CharacterSet";
        parent: Alternative | Quantifier;
        kind: "any";
    }
    export interface EscapeCharacterSet extends NodeBase {
        type: "CharacterSet";
        parent: Alternative | Quantifier | CharacterClass;
        kind: "digit" | "space" | "word";
        negate: boolean;
    }
    export interface UnicodePropertyCharacterSet extends NodeBase {
        type: "CharacterSet";
        parent: Alternative | Quantifier | CharacterClass;
        kind: "property";
        key: string;
        value: string | null;
        negate: boolean;
    }
    export interface Character extends NodeBase {
        type: "Character";
        parent: Alternative | Quantifier | CharacterClass | CharacterClassRange;
        value: number;
    }
    export interface Backreference extends NodeBase {
        type: "Backreference";
        parent: Alternative | Quantifier;
        ref: number | string;
        resolved: CapturingGroup;
    }
    export interface Flags extends NodeBase {
        type: "Flags";
        parent: RegExpLiteral | null;
        dotAll: boolean;
        global: boolean;
        ignoreCase: boolean;
        multiline: boolean;
        sticky: boolean;
        unicode: boolean;
    }
}

declare module 'regexpp/parser' {
    import { Flags, RegExpLiteral, Pattern } from "regexpp/ast";
    import { EcmaVersion } from "regexpp/ecma-versions";
    export namespace RegExpParser {
        interface Options {
            strict?: boolean;
            ecmaVersion?: EcmaVersion;
        }
    }
    export class RegExpParser {
        constructor(options?: RegExpParser.Options);
        parseLiteral(source: string, start?: number, end?: number): RegExpLiteral;
        parseFlags(source: string, start?: number, end?: number): Flags;
        parsePattern(source: string, start?: number, end?: number, uFlag?: boolean): Pattern;
    }
}

declare module 'regexpp/validator' {
    import { EcmaVersion } from "regexpp/ecma-versions";
    export namespace RegExpValidator {
        interface Options {
            strict?: boolean;
            ecmaVersion?: EcmaVersion;
            onLiteralEnter?(start: number): void;
            onLiteralLeave?(start: number, end: number): void;
            onFlags?(start: number, end: number, global: boolean, ignoreCase: boolean, multiline: boolean, unicode: boolean, sticky: boolean, dotAll: boolean): void;
            onPatternEnter?(start: number): void;
            onPatternLeave?(start: number, end: number): void;
            onDisjunctionEnter?(start: number): void;
            onDisjunctionLeave?(start: number, end: number): void;
            onAlternativeEnter?(start: number, index: number): void;
            onAlternativeLeave?(start: number, end: number, index: number): void;
            onGroupEnter?(start: number): void;
            onGroupLeave?(start: number, end: number): void;
            onCapturingGroupEnter?(start: number, name: string | null): void;
            onCapturingGroupLeave?(start: number, end: number, name: string | null): void;
            onQuantifier?(start: number, end: number, min: number, max: number, greedy: boolean): void;
            onLookaroundAssertionEnter?(start: number, kind: "lookahead" | "lookbehind", negate: boolean): void;
            onLookaroundAssertionLeave?(start: number, end: number, kind: "lookahead" | "lookbehind", negate: boolean): void;
            onEdgeAssertion?(start: number, end: number, kind: "start" | "end"): void;
            onWordBoundaryAssertion?(start: number, end: number, kind: "word", negate: boolean): void;
            onAnyCharacterSet?(start: number, end: number, kind: "any"): void;
            onEscapeCharacterSet?(start: number, end: number, kind: "digit" | "space" | "word", negate: boolean): void;
            onUnicodePropertyCharacterSet?(start: number, end: number, kind: "property", key: string, value: string | null, negate: boolean): void;
            onCharacter?(start: number, end: number, value: number): void;
            onBackreference?(start: number, end: number, ref: number | string): void;
            onCharacterClassEnter?(start: number, negate: boolean): void;
            onCharacterClassLeave?(start: number, end: number, negate: boolean): void;
            onCharacterClassRange?(start: number, end: number, min: number, max: number): void;
        }
    }
    export class RegExpValidator {
        constructor(options?: RegExpValidator.Options);
        validateLiteral(source: string, start?: number, end?: number): void;
        validateFlags(source: string, start?: number, end?: number): void;
        validatePattern(source: string, start?: number, end?: number, uFlag?: boolean): void;
    }
}

declare module 'regexpp/visitor' {
    import { Alternative, Assertion, Backreference, CapturingGroup, Character, CharacterClass, CharacterClassRange, CharacterSet, Flags, Group, Node, Pattern, Quantifier, RegExpLiteral } from "regexpp/ast";
    export class RegExpVisitor {
        constructor(handlers: RegExpVisitor.Handlers);
        visit(node: Node): void;
    }
    export namespace RegExpVisitor {
        interface Handlers {
            onAlternativeEnter?(node: Alternative): void;
            onAlternativeLeave?(node: Alternative): void;
            onAssertionEnter?(node: Assertion): void;
            onAssertionLeave?(node: Assertion): void;
            onBackreferenceEnter?(node: Backreference): void;
            onBackreferenceLeave?(node: Backreference): void;
            onCapturingGroupEnter?(node: CapturingGroup): void;
            onCapturingGroupLeave?(node: CapturingGroup): void;
            onCharacterEnter?(node: Character): void;
            onCharacterLeave?(node: Character): void;
            onCharacterClassEnter?(node: CharacterClass): void;
            onCharacterClassLeave?(node: CharacterClass): void;
            onCharacterClassRangeEnter?(node: CharacterClassRange): void;
            onCharacterClassRangeLeave?(node: CharacterClassRange): void;
            onCharacterSetEnter?(node: CharacterSet): void;
            onCharacterSetLeave?(node: CharacterSet): void;
            onFlagsEnter?(node: Flags): void;
            onFlagsLeave?(node: Flags): void;
            onGroupEnter?(node: Group): void;
            onGroupLeave?(node: Group): void;
            onPatternEnter?(node: Pattern): void;
            onPatternLeave?(node: Pattern): void;
            onQuantifierEnter?(node: Quantifier): void;
            onQuantifierLeave?(node: Quantifier): void;
            onRegExpLiteralEnter?(node: RegExpLiteral): void;
            onRegExpLiteralLeave?(node: RegExpLiteral): void;
        }
    }
}

declare module 'regexpp/ecma-versions' {
    export type EcmaVersion = 5 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020;
}

