// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Notas de Pau 📘',
            pagination: false,
            customCss: [
                './src/styles/theme.css',
            ],
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
		}), react()],
    
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
});