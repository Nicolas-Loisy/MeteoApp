class LieuxFavorisBuilder {
    private readonly lieuxFavoris: Lieu[];
    private serviceGeo: ServiceGeographie;

    constructor(lieuxFavoris: Lieu[] = [] ) {
        this.lieuxFavoris = lieuxFavoris;
        this.serviceGeo = new ServiceGeographie(process.env.OPEN_GEO_API_URL ?? "");
    }

    public async rechercheLieux(nomLieu: string): Promise<Lieu[]> {
        const lieuxData = await this.serviceGeo.rechercheLieux(nomLieu);
        const jsonLieuxData = await lieuxData.json();
        
        const resultLieuxRecherche: Lieu[] = [];
        for (const lieuData of jsonLieuxData) {
            const longitude = new UniteCoordonnee(parseFloat(lieuData.lon));
            const latitude = new UniteCoordonnee(parseFloat(lieuData.lat));
            const lieu = new Lieu(lieuData.name, longitude, latitude);
            resultLieuxRecherche.push(lieu);
        }
        
        return resultLieuxRecherche;
    }

    public ajouterLieu(nom: string, longitude: UniteCoordonnee, latitude: UniteCoordonnee): void {
        const lieu = new Lieu(nom, longitude, latitude);
        this.lieuxFavoris.push(lieu);
    }

    public supprimerLieu(nom: string): void {
        const index = this.lieuxFavoris.findIndex((lieu) => lieu.getNom() === nom);

        if (index !== -1) {
            this.lieuxFavoris.splice(index, 1);
        }
    }

    public getLieux(): Lieu[] {
        return this.lieuxFavoris;
    }
}
