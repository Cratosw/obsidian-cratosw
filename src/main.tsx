import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Editor, MarkdownView, Plugin } from 'obsidian'
import { MDXPreviewState, MDX_PREVIEW, MdxPreview } from './mdxPreview'

export default class ObsidianMDX extends Plugin {
	React: typeof React;
    ReactDOM: typeof ReactDom;
	async setupReact() {
		this.React = React;
		this.ReactDOM = ReactDom;
    }
  async onload() {
	await this.setupReact();
    this.registerView(MDX_PREVIEW, (leaf) => new MdxPreview(leaf))

    this.addCommand({
      id: 'mdx 预览',
      name: 'mdx 预览',
      editorCheckCallback: (
        checking: boolean,
        _editor: Editor,
        view: MarkdownView
      ) => {
        if (['mdx', 'md'].includes(view.file!.extension)) {
          if (!checking) {
            this.app.workspace.detachLeavesOfType(MDX_PREVIEW)
            const leaf = this.app.workspace.getLeaf('tab')
            const viewState: MDXPreviewState = {
              data: view.data,
              basename: view.file!.basename,
            }
            leaf.setViewState({
              type: MDX_PREVIEW,
              state: viewState,
              active: true,
            })
            this.app.workspace.revealLeaf(leaf)
          }
          return true
        }
        return false
      },
    })
  }
}
