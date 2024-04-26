import { ReactNode } from "react";

export interface ISelectOption<V = any> {
  label: string;
  value: V;
  icon?: ReactNode | string;
}

export type IProjectProduct = "roadmap" | "insight";
export type IProjectProductOption = ISelectOption<IProjectProduct>;

export interface ITextEditorCollaborationUser {
  name: string;
  color: string;
}

export enum EditorToolbarEnum {
  heading = 'heading',
  bold = 'bold',
  italic = 'italic',
  strike = 'strike',
  link = 'link',
  underline = 'underline',
  image = 'image',
  code = 'code',
  orderedList = 'orderedList',
  bulletList = 'bulletList',
  align = 'align',
  codeBlock = 'codeBlock',
  blockquote = 'blockquote',
  table = 'table',
  history = 'history',
  youtube = 'youtube',
  color = 'color',
  mention = 'mention',
  ai = 'ai'
}

export type IEditorToolbar = `${EditorToolbarEnum}`;