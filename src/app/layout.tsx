import '@/styles/globals.css';
import { cn } from '@/lib/utils/cn';
import { sans, mono } from '@/lib/constants/fonts';

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body
                className={cn(
                    sans.variable,
                    mono.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}

export { metadata } from '@/app/metadata';