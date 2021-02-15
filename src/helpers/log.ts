import chalk from 'chalk';

export default function display(str: string, color: string): void {
    console.log((chalk as any)[color](str));
}

export function warning(str: string): void {
    display(str, 'yellow');
}

export function info(str: string): void {
    display(str, 'cyan');
}

export function success(str: string): void {
    display(str, 'green');
}

export function error(str: string): void {
    display(str, 'red');
}
