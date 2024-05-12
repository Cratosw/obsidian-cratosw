import type { MDXComponents } from "mdx/types";
import { AnimatePresence, m } from "framer-motion";
import {
	Code,
	Section,
	SectionLink,
	SectionCode,
	Spotlight,
	Scrollycoding,
	Preview,
	Annotation,
	Slideshow,
	InlineCode,
	CodeSlot,
	PreviewSlot,
	CH
} from "@code-hike/mdx/components";

export const components: MDXComponents = {
	Code,
	Section,
	SectionLink,
	SectionCode,
	Spotlight,
	Scrollycoding,
	Preview,
	annotations: CH.annotations,
	Annotation,
	Slideshow,
	InlineCode,
	CodeSlot,
	PreviewSlot,
	StaticToggle: CH.StaticToggle,
	...CH,
	Mdiv: m.div,
	AnimatePresence: AnimatePresence,
	Ma: m.a,
};
