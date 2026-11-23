// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://paufranch.github.io',
    integrations: [
        starlight({
            title: 'Notas de Pau 📘',
            pagination: false,
            customCss: [
                './src/styles/theme.css',
            ],
            components: {
                Hero: './src/components/HomeHero.astro',
            },
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/paufranch' }],
		}), react(), mdx()],
    
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
});