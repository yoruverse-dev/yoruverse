import '@/styles/globals.css';
import { cn } from '@/lib/utils/cn';
import { sans, mono } from '@/lib/constants/fonts';
import { UserProvider } from '@/lib/context/user';

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body
                className={cn(
                    sans.variable,
                    mono.variable
                )}
            >
                <UserProvider>
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}

export { metadata } from '@/app/metadata';