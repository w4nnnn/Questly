import type { Metadata } from 'next';
import { getModuleWithItems } from '@/lib/actions/modules';
import { getUserModuleProgress } from '@/lib/actions/user-progress';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { ModulePlayer } from '@/components/modules/module-player';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const moduleData = await getModuleWithItems(id);

    if (!moduleData || !moduleData.isPublished) {
        return { title: 'Module Not Found' };
    }

    return {
        title: moduleData.title,
        description: moduleData.description || `Kerjakan modul "${moduleData.title}" di Questly.`,
        openGraph: {
            title: moduleData.title,
            description: moduleData.description || `Kerjakan modul "${moduleData.title}" di Questly.`,
            ...(moduleData.coverImage && { images: [moduleData.coverImage] }),
        },
    };
}

export default async function ModulePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    }

    const { id } = await params;
    const moduleData = await getModuleWithItems(id);

    if (!moduleData || !moduleData.isPublished) {
        notFound();
    }

    const userId = session.user.id as string;
    if (!userId) {
        redirect('/login');
    }

    const progress = await getUserModuleProgress(userId, id);

    return (
        <ModulePlayer
            module={moduleData}
            userId={userId}
            initialProgress={progress}
        />
    );
}
