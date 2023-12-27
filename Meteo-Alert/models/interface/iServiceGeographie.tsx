interface iServiceGeographie {
    rechercheLieux(nomLieu: string): Promise<Response>;
}

export default iServiceGeographie;