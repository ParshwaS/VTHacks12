import { initAuth } from "@propelauth/express";


class PropelAuth {
    public requireUser: any;
    public fetchUserMetadataByUserId: any;

    constructor() {
        const {
            requireUser,
            fetchUserMetadataByUserId,
        } = initAuth({
            authUrl: process.env.PROPELAUTH_URL!,
            apiKey: process.env.PROPELAUTH_API!, 
        });

        this.requireUser = requireUser;
        this.fetchUserMetadataByUserId = fetchUserMetadataByUserId;
    }
}

export default new PropelAuth();  // Exporting an instance of PropelAuth class