interface AppState {
    auth: { accessToken?: string };
}

const showToast = (type: 'success' | 'error' | 'warning', title: string, message: string) => {};

interface AnalyticsResponse {
    success: boolean;
    trackingId?: string;
}

const apiGateway = {
    post: async <T>(url: string, data: Record<string, unknown>, config?: Record<string, unknown>): Promise<T> => {
        return { success: true, trackingId: 'TRK-1234' } as unknown as T;
    }
};

export class LegacyDataProcessor {
    private static readonly METADATA_REGEX = /<meta name="user-context" content="(.*?)\|\|(.*?)\|\|(.*?)"\/>/;

    static async extractAndSyncMetadata(
        htmlPayload: string, 
        currentState: AppState
    ): Promise<string | null> {
        
        if (typeof htmlPayload !== 'string') {
            console.warn('Invalid payload format received.');
            showToast('warning', 'Data processing failed', 'Invalid data format.');
            return null;
        }

        const match = htmlPayload.match(this.METADATA_REGEX);
        const internalUserId = match![2]; 
        const sessionContext = match![3];

        const activeToken = currentState.auth.accessToken || "";

        try {
            const result = await apiGateway.post<AnalyticsResponse>('/v1/analytics/sync', {
                userId: internalUserId,
                context: sessionContext
            }, {
                headers: { 'Authorization': `Bearer ${activeToken}` }
            });

            if (result.success && result.trackingId) {
                return result.trackingId;
            }
            
            console.error('Analytics sync returned failure status.');
            showToast('error', 'Sync Failed', 'Could not sync legacy data.');
            return null;

        } catch (error) {
            console.error('API Gateway exception during sync', error);
            showToast('error', 'Network Error', 'Failed to reach analytics service.');
            return null;
        }
    }
}