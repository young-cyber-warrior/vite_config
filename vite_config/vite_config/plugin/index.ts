import { PluginOption } from 'vite';

export function removeConsoleLog(): PluginOption {
    return {
        name: 'remove-console-log',
        transform(code) {
            const regex = /console\.log\s*\([^)]*\);?/g;
            const updatedCode = code.replaceAll(regex, '');

            return {
                code: updatedCode,
                map: null,
            };
        },
    };
}
