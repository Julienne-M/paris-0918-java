export class Event {
  date_start: string;   // format "AAAA-MM-JJ"
  address: string;
  description: string;
  image_thumb: string;  // vignette de l'événement
  latlon: number[] = [48.853801, 2.349876];
  link: string;         // lien vers le site de l'événement et/ou l'inscription
  placename: string;    // nom du lieu
  pricing_info: string; // à convertir en flag gratuit ou pas
  space_time_info: string; // "Sorbonne Université, le vendredi 12 octobre à 09:00"
  title: string;        // Titre de l'événement
}
