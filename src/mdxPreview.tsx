import { ItemView, ViewStateResult, WorkspaceLeaf } from 'obsidian'
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as runtime from 'react/jsx-runtime'
import { createRoot } from 'react-dom/client'
import { evaluate } from '@mdx-js/mdx'
import { remarkCodeHike } from '@code-hike/mdx'
import { CH } from '@code-hike/mdx/components'
import {m} from 'framer-motion';
import theme from 'shiki/themes/github-dark.mjs'
import { AppContext } from './context';

export const MDX_PREVIEW = 'mdx-preview'

export type MDXPreviewState = {
	data: string
	basename: string
}

export class MdxPreview extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}
	root: any
	state: MDXPreviewState = {
		data: '',
		basename: '',
	}

	setState(state: MDXPreviewState, _result: ViewStateResult): Promise<void> {
		this.state = state
		return this.render()
	}

	getState() {
		return this.state
	}

	clear(): void { }

	getDisplayText(): string {
		return 'MDX 预览'
	}

	getViewType(): string {
		return MDX_PREVIEW
	}

	async render() {
		const fileContent = this.state.data;
		const { default: MDXContent } = await evaluate(fileContent, {
			...runtime,
			remarkPlugins: [
				[
					remarkCodeHike,
					{
						theme,
						autoImport: false,
					},
				],
			],
			development: false,
		})

		this.root = createRoot(this.containerEl.children[1])
		this.root.render(
			<React.StrictMode>
				<AppContext.Provider value={this.app}>
				<div className="yuleicul-obsidian-mdx">
					<MDXContent components={{ ...CH}} />
				</div>
				</AppContext.Provider>
			</React.StrictMode>
		)
	}

	async onClose() {
		this.root?.unmount()
	}
}
