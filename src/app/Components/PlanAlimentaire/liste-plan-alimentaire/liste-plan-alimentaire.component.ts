import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PlanalimentaireService } from 'src/app/Services/Service-PlanAlimentaire/planalimentaire.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PlanAlimentaire } from 'src/app/models/PlanAlimentaire';
import { Site } from 'src/app/models/Site';
declare var window: any;

// Add a type for the options
type OptionType = 'texture' | 'regime' | 'convictions_alimentaires' | 'soupe_midi' | 'soupe_soir' | 'taille_portion';

// Create an interface for the options
interface Option {
  label: string;
  value: string;
  checked: boolean;
  type: OptionType;
}

@Component({
  selector: 'app-liste-plan-alimentaire',
  templateUrl: './liste-plan-alimentaire.component.html',
  styleUrls: ['./liste-plan-alimentaire.component.css']
})
export class ListePlanAlimentaireComponent {
  @ViewChild('successModal', { static: true }) successModal: any;

  modalRef!: BsModalRef;
  searchQuery: string = '';
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  sites: any[] = [];
  records: any[] = [];
  site$ !: Observable<any>;

  idTodelete: number = 0;

  deleteModal: any;
  id: any
  updateModalVisible: boolean = true;

  matin: any
  client: any
  regime: any
  midi: any
  alcool: any
  texture: any
  specificite_diet_matin: any
  soir: any
  soupe_soir: any
  dessert: any
  menu_velours_matin: any
  soupe_midi: any
  specificites_midi: any
  taille_portion: any
  statut: any
  specificite_dessert: any
  gouter: any
  specifite_gouter: any
  localisation_repas: any
  specifite_resto_matin: any
  menu_velours_soir: any
  specificite_diet_soir: any
  specificite_resto_soir: any
  convictions_alimentaires: any
  allergie_intolerance: any
  autres_infos_utiles: any
  texture_liquides_boissons: any
  nbr_mesurettes: any
  temp_liquide_boisson: any
  site: any

  planalimentaire: PlanAlimentaire[] = [];


  all_plans: PlanAlimentaire[] = []

  myForm: any;
  frm: any;

  constructor(private paservice: PlanalimentaireService, private siteservice: ApiSiteService,
    private bsModalService: BsModalService


  ) {

  }

  form: any = new FormGroup({


    matin: new FormControl(''),
    client: new FormControl('', [Validators.required]),
    regime: new FormControl(''),
    midi: new FormControl(''),
    alcool: new FormControl(''),
    texture: new FormControl(''),
    specificite_diet_matin: new FormControl(''),
    soir: new FormControl(''),
    soupe_soir: new FormControl(''),
    dessert: new FormControl(''),
    menu_velours_matin: new FormControl(''),
    soupe_midi: new FormControl(''),
    specificites_midi: new FormControl(''),
    taille_portion: new FormControl(''),
    statut: new FormControl(''),
    specificite_dessert: new FormControl(''),
    gouter: new FormControl(''),
    specifite_gouter: new FormControl(''),
    localisation_repas: new FormControl(''),
    specifite_resto_matin: new FormControl(''),
    menu_velours_soir: new FormControl(''),
    specificite_diet_soir: new FormControl(''),
    specificite_resto_soir: new FormControl(''),
    convictions_alimentaires: new FormControl(''),
    allergie_intolerance: new FormControl(''),
    autres_infos_utiles: new FormControl(''),
    texture_liquides_boissons: new FormControl(''),
    nbr_mesurettes: new FormControl(''),
    temp_liquide_boisson: new FormControl(''),
    site: new FormControl('', [Validators.required]),


  });


  loadData() {
    this.paservice.getPlanAlimentaires().subscribe(
      (data: PlanAlimentaire[]) => {
        this.planalimentaire = data;
        this.filteredPlanAlimentaire = data;
        this.filterPlanAlimentaireByGouter(); // Call the filter method after fetching the data
        // Close all sites
        this.sites.forEach(site => {
          site.expanded = false;
        });
      },
      (error) => {
        console.error('Error fetching Plan Alimentaire:', error);
      }
    );
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  delete() {
    this.paservice.deletePlanAlimentaire(this.idTodelete).subscribe({
      next: (data) => {
        this.all_plans = this.all_plans.filter(_ => _.id != this.idTodelete)
        location.reload()
        this.deleteModal.hide();
      },
      error: (err) => {
        console.log(err);
      }



    });
  }

  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }


  updatePlanAlimentaire(): void {
    // Create a new FormData object
    const formData = new FormData();

    // Append the attribute values to the FormData object
    formData.append('matin', String(this.matin));
    formData.append('client', this.client);
    formData.append('regime', this.regime);
    formData.append('midi', String(this.midi));
    formData.append('alcool', String(this.alcool));
    formData.append('texture', this.texture);
    formData.append('specificite_diet_matin', this.specificite_diet_matin);
    formData.append('soir', String(this.soir));
    formData.append('soupe_soir', this.soupe_soir);
    formData.append('dessert', this.dessert);
    formData.append('menu_velours_matin', String(this.menu_velours_matin));
    formData.append('soupe_midi', this.soupe_midi);
    formData.append('specificites_midi', this.specificites_midi);
    formData.append('taille_portion', String(this.taille_portion));
    formData.append('statut', this.statut);
    formData.append('specificite_dessert', this.specificite_dessert);
    formData.append('gouter', String(this.gouter));
    formData.append('specifite_gouter', this.specifite_gouter);
    formData.append('localisation_repas', this.localisation_repas);
    formData.append('specifite_resto_matin', this.specifite_resto_matin);
    formData.append('menu_velours_soir', String(this.menu_velours_soir));
    formData.append('specificite_diet_soir', this.specificite_diet_soir);
    formData.append('specificite_resto_soir', this.specificite_resto_soir);
    formData.append('convictions_alimentaires', this.convictions_alimentaires);
    formData.append('allergie_intolerance', this.allergie_intolerance);
    formData.append('autres_infos_utiles', this.autres_infos_utiles);
    formData.append('texture_liquides_boissons', this.texture_liquides_boissons);
    formData.append('nbr_mesurettes', this.nbr_mesurettes);
    formData.append('temp_liquide_boisson', this.temp_liquide_boisson);
    formData.append('site', String(this.site));

    // You can continue appending the remaining attributes

    // Finally, you can use the formData as needed, such as sending it in an HTTP request


    this.paservice.update(this.id, formData)

      .subscribe({
        next: (res) => {
          console.log(res);
          this.openModal();
          this.updateModalVisible = false;
        },
        error: (e) => {
          console.error(e);
        }
      });
  }


  ngOnInit(): void {

    this.myForm = new FormGroup({
      site: new FormControl(''),
      gouter: new FormControl(''),


    });


    this.site$ = this.siteservice.getAllSite();

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );


    this.siteservice.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );

    this.filteredPlanAlimentaire = this.planalimentaire;

    console.log('Plan Alimentaire:', this.planalimentaire);
    console.log('Filtered Plan Alimentaire:', this.filteredPlanAlimentaire);



    this.loadData()
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];





  }
  selectedFilter: string = 'all';

  get displayedplanalim(): any[] {

    let filteredData: any[];

    if (this.selectedFilter === 'all') {
      filteredData = this.filteredPlanAlimentaire;
    } else {
      filteredData = this.filteredPlanAlimentaire.filter((ren) => ren.midi && this.selectedFilter === 'midi' ||
        ren.matin && this.selectedFilter === 'matin' ||
        ren.soir && this.selectedFilter === 'soir' ||
        ren.gouter && this.selectedFilter === 'gouter');
    }

    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return filteredData.slice(startIndex, endIndex);


  }

  get totalPages(): number {
    return Math.ceil(this.filteredPlanAlimentaire.length / this.itemsPerPage);
  }

  onItemsPerPageChange(option: number) {
    this.p = 1;
    this.itemsPerPage = option;
  }
  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }


  getDisplayedRange(): string {
    const startIndex = (this.p - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.p * this.itemsPerPage, this.filteredPlanAlimentaire.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.filteredPlanAlimentaire.length} entrées`;
  }


  resetSearchQuery() {
    this.searchQuery = '';
  }

  getRecordCount(site: any): number {
    const sitePlans = this.filteredPlanAlimentaire.filter(plan => plan.site === site.id);
    return sitePlans.length;
  }





  selectedSiteId: number | undefined;

  filterConstatBySite(): void {
    const selectedSite = parseInt(this.myForm.get('site')?.value);

    if (selectedSite) {
      this.paservice.getPlanAlimentaires().subscribe(
        (data: PlanAlimentaire[]) => {
          const ca = data;
          const filteredMenus = ca.filter(d => {
            const siteIds = Array.isArray(d.site) ? d.site.map((s: Site) => s.id) : [d.site];
            return siteIds.includes(selectedSite);
          });

          if (filteredMenus.length > 0) {
            this.selectedSiteId = selectedSite;
            this.filteredPlanAlimentaire = filteredMenus; // Update the filteredPlanAlimentaire array
          } else {
            console.log(`Aucun menu trouvé pour le site sélectionné: ${selectedSite}`);
            this.filteredPlanAlimentaire = []; // Reset the filteredPlanAlimentaire array
          }

          console.log("menus filtrés", this.filteredPlanAlimentaire);
          console.log("site sélectionné", this.selectedSiteId);

        },
        (error: any) => {
          console.log(error);
        }
      );

      this.sites.forEach((site) => {
        site.expanded = site.id === selectedSite;
      });

    } else {
      this.myForm.reset();
      this.selectedSiteId = undefined;
      console.log("id de ce site", this.selectedSiteId);
      this.loadData();
      this.sites.forEach((site) => {
        site.expanded = true;
      });
    }
  }

  selectedType: any = '';


  resetSiteFilters(): void {
    // Reset the selected filters and reload the data
    this.selectedType = ''; // Reset the selected type filter
    this.myForm.reset(); // Reset the form and selected site filter
    this.loadData(); // Reload the data
  }

  filteredPlanAlimentaire: PlanAlimentaire[] = [];
  filteredPA: PlanAlimentaire[] = [];

  selectedGouter: boolean | null = null;

  filterPlanAlimentaireByGouter() {
    const selectedValue = this.myForm.get('gouter')?.value;
    this.selectedGouter = selectedValue === 'true' ? true : selectedValue === 'false' ? false : null;

    console.log('Selected Gouter:', this.selectedGouter);

    if (this.selectedGouter !== null) {
      this.filteredPlanAlimentaire = this.planalimentaire.filter(plan => plan.gouter === this.selectedGouter);
    } else {
      this.filteredPlanAlimentaire = this.planalimentaire;
    }

    console.log('Filtered Plan Alimentaire:', this.filteredPlanAlimentaire);



    // Expand the corresponding sites
    this.filteredPlanAlimentaire.forEach(dpa => {
      const site = this.sites.find(s => s.id === dpa.site);
      if (site) {
        site.expanded = true;
      }
    });
  }

  resetFilters() {
    this.selectedGouter = null;
    this.myForm.patchValue({ gouter: '' });
    this.filteredPlanAlimentaire = this.planalimentaire;

    console.log('Selected Gouter:', this.selectedGouter);
    console.log('Filtered Plan Alimentaire:', this.filteredPlanAlimentaire);
  }
  refreshTable(filter: string): void {
    this.selectedFilter = filter;
  }

  // filterKeyword: string = '';
  // applyStaticFilter(keyword: string): void {
  //   const words = keyword.toLowerCase().split(' ');
  //   this.filteredPlanAlimentaire = this.planalimentaire.filter(item => {
  //     const sentence = item.dessert.toLowerCase();
  //     return words.some(word => sentence.split(' ').includes(word));
  //   });
  // }












  selectedFilterDess: string = 'all';

  refreshTableDess(filter: string): void {
    this.selectedFilterDess = filter;
    this.filterTable();
  }

  filterTable(): void {
    if (this.selectedFilterDess === 'all') {
      this.filteredPlanAlimentaire = this.planalimentaire;
    } else {
      const staticWord = this.selectedFilterDess.toLowerCase();

      this.filteredPlanAlimentaire = this.planalimentaire.filter((item) => {
        const dessert = item.dessert.toLowerCase();
        return dessert.includes(staticWord);
      });
    }
  }

  resetFiltersDess(): void {
    this.selectedFilterDess = 'all';
    this.filteredPlanAlimentaire = this.planalimentaire;
  }
  getMaxHeight(): string {
    const rowHeight = 90; // Specify the height of a single row in pixels
    const maxRowsToShow = 5; // Specify the maximum number of rows to display without scrolling

    const maxHeight = (rowHeight * maxRowsToShow) + 'px';
    return maxHeight;
  }



  soupeMidiOptions: Option[] = [
    { label: 'Soupe ENrichie', value: 'Soupe ENrichie', checked: false, type: 'soupe_midi' },
    { label: 'Sans soupe', value: 'Sans soupe', checked: false, type: 'soupe_midi' },
    { label: 'Soupe enrichie X2', value: 'Soupe enrichie X2', checked: false, type: 'soupe_midi' },
    { label: 'Soupe mixée lisse', value: 'Soupe mixée lisse', checked: false, type: 'soupe_midi' },
    { label: 'Soupe épaisse', value: 'Soupe épaisse', checked: false, type: 'soupe_midi' },
  ];

  soupeSoirOptions: Option[] = [
    { label: 'Soupe enrichie', value: 'Soupe enrichie', checked: false, type: 'soupe_soir' },
    { label: 'Sans soupe', value: 'Sans soupe', checked: false, type: 'soupe_soir' },
    { label: 'Soupe enrichie X2', value: 'Soupe enrichie X2', checked: false, type: 'soupe_soir' },
    { label: 'Soupe mixée lisse', value: 'Soupe mixée lisse', checked: false, type: 'soupe_soir' },
    { label: 'Soupe épaisse', value: 'Soupe épaisse', checked: false, type: 'soupe_soir' },
  ];

  convictionsAlimentairesOptions: Option[] = [
    { label: 'Sans viande', value: 'Sans viande', checked: false, type: 'convictions_alimentaires' },
    { label: 'Sans poisson', value: 'Sans poisson', checked: false, type: 'convictions_alimentaires' },
    { label: 'Sans porc', value: 'Sans porc', checked: false, type: 'convictions_alimentaires' },
    { label: 'Végétarien', value: 'Végétarien', checked: false, type: 'convictions_alimentaires' },
  ];

  taillePortionOptions: Option[] = [
    { label: '1/2', value: '1/2', checked: false, type: 'taille_portion' },
    { label: 'XL', value: 'XL', checked: false, type: 'taille_portion' },
    { label: '+ de légumes', value: '+ de légumes', checked: false, type: 'taille_portion' },
    { label: '- de féculents', value: '- de féculents', checked: false, type: 'taille_portion' },
  ];

  checkboxOptions: { label: string, value: string, checked: boolean }[] = [
    { label: 'Risque de fausse route', value: 'Risque de fausse route', checked: false },
    { label: 'Vinue coupée / IDDSI 6 (Petits morceaux tendres, taille d\'une bouchée)', value: 'Vinue coupée / IDDSI 6 (Petits morceaux tendres, taille d\'une bouchée)', checked: false },
    { label: 'Tout coupé / IDDSI 6 (Petits morceaux tendres, taille d\'une bouchée)', value: 'Tout coupé / IDDSI 6 (Petits morceaux tendres, taille d\'une bouchée)', checked: false },
    { label: 'Viande hachée fine / IDDSI 5 (finement haché, lubrifié)', value: 'Viande hachée fine / IDDSI 5 (finement haché, lubrifié)', checked: false },
    { label: 'Tout haché fin / IDDSI 5 (finement haché, lubrifié)', value: 'Tout haché fin / IDDSI 5 (finement haché, lubrifié)', checked: false },
    { label: 'Viande/poisson velours / IDDSI 4 (mixé lisse)', value: 'Viande/poisson velours / IDDSI 4 (mixé lisse)', checked: false },
    { label: 'Tout velours / IDDSI 4 (mixé lisse)', value: 'Tout velours / IDDSI 4 (mixé lisse)', checked: false },
    { label: 'Liquide / IDDSI 3', value: 'Liquide / IDDSI 3', checked: false },
    { label: 'Finger food', value: 'Finger food', checked: false }
  ];


  regimeOptions: { label: string, value: string, checked: boolean }[] = [
    { label: 'Riche en fibres (35g/j)', value: 'Riche en fibres (35g/j)', checked: false },
    { label: 'Pauvre en fibres stricte (10-14g/j)', value: 'Pauvre en fibres stricte (10-14g/j)', checked: false },
    { label: 'Sans gluten', value: 'Sans gluten', checked: false },
    { label: 'Sans lactose', value: 'Sans lactose', checked: false },
    { label: 'Sans fructose', value: 'Sans fructose', checked: false },
    { label: 'Pauvre en fibres (15-20g/j)', value: 'Pauvre en fibres (15-20g/j)', checked: false },
    { label: 'IRC', value: 'IRC', checked: false },
    { label: 'Hyposodé', value: 'Hyposodé', checked: false },
    { label: 'Enrichi', value: 'Enrichi', checked: false },
    { label: 'Diabétique', value: 'Diabétique', checked: false },
    { label: 'Alimentation plaisir', value: 'Alimentation plaisir', checked: false },
    { label: 'Dialyse', value: 'Dialyse', checked: false },
    { label: 'Personnalisé', value: 'Personnalisé', checked: false },
  ];



  // Merge all the options into one array
  options: Option[] = [
    ...this.checkboxOptions.map(option => ({ ...option, type: 'texture' as OptionType })),
    ...this.regimeOptions.map(option => ({ ...option, type: 'regime' as OptionType })),
    ...this.soupeMidiOptions.map(option => ({ ...option, type: 'soupe_midi' as OptionType })),
    ...this.soupeSoirOptions.map(option => ({ ...option, type: 'soupe_soir' as OptionType })),
    ...this.convictionsAlimentairesOptions.map(option => ({ ...option, type: 'convictions_alimentaires' as OptionType })),
    ...this.taillePortionOptions.map(option => ({ ...option, type: 'taille_portion' as OptionType })),
  ];

  // Update the toggleCheckbox and isCheckboxChecked functions
  toggleCheckbox(checkboxValue: string, optionType: OptionType): void {
    const option = this.options.find(opt => opt.value === checkboxValue && opt.type === optionType);

    if (option) {
      option.checked = !option.checked;
      this.UpdateCheckboxes(optionType);
    }
  }

  isCheckboxChecked(checkboxValue: string, optionType: OptionType): boolean {
    const option = this.options.find(opt => opt.value === checkboxValue && opt.type === optionType);
    return option ? option.checked : false;
  }

  // Update the updateTextureAndRegime function
  UpdateCheckboxes(optionType: OptionType): void {
    if (optionType === 'texture') {
      this.texture = this.options
        .filter(opt => opt.type === 'texture' && opt.checked)
        .map(opt => opt.value);
    } else if (optionType === 'regime') {
      this.regime = this.options
        .filter(opt => opt.type === 'regime' && opt.checked)
        .map(opt => opt.value);
    } else if (optionType === 'soupe_midi') {
      this.soupe_midi = this.options
        .filter(opt => opt.type === 'soupe_midi' && opt.checked)
        .map(opt => opt.value);
    } else if (optionType === 'soupe_soir') {
      this.soupe_soir = this.options
        .filter(opt => opt.type === 'soupe_soir' && opt.checked)
        .map(opt => opt.value);
    } else if (optionType === 'convictions_alimentaires') {
      this.convictions_alimentaires = this.options
        .filter(opt => opt.type === 'convictions_alimentaires' && opt.checked)
        .map(opt => opt.value);
    } else if (optionType === 'taille_portion') {
      this.taille_portion = this.options
        .filter(opt => opt.type === 'taille_portion' && opt.checked)
        .map(opt => opt.value);
    }
  }




  getPAData(
    id: number,
    matin: boolean,
    client: string,
    regime: string[] | undefined,
    midi: boolean,
    alcool: boolean,
    texture: string[] | undefined,
    specificite_diet_matin: string,
    soir: boolean,
    soupe_soir: string[] | undefined,
    dessert: string,
    menu_velours_matin: boolean,
    soupe_midi: string[] | undefined,
    specificites_midi: string,
    taille_portion: string[] | undefined,
    statut: string,
    specificite_dessert: string,
    gouter: boolean,
    specifite_gouter: string,
    localisation_repas: string,
    specifite_resto_matin: string,
    menu_velours_soir: boolean,
    specificite_diet_soir: string,
    specificite_resto_soir: string,
    convictions_alimentaires: string[] | undefined,
    allergie_intolerance: string,
    autres_infos_utiles: string,
    texture_liquides_boissons: string,
    nbr_mesurettes: string,
    temp_liquide_boisson: string,
    site: number
  ) {
    this.id = id;
    this.matin = matin;
    this.client = client;
    this.regime = regime;
    this.midi = midi;
    this.alcool = alcool;
    // Initialize texture as an empty array
    this.texture = texture || [];

    // Add the selected values to the texture array

    this.specificite_diet_matin = specificite_diet_matin;
    this.soir = soir;
    this.soupe_soir = soupe_soir;
    this.dessert = dessert;
    this.menu_velours_matin = menu_velours_matin;
    this.soupe_midi = soupe_midi;
    this.specificites_midi = specificites_midi;
    this.taille_portion = taille_portion;
    this.statut = statut;
    this.specificite_dessert = specificite_dessert;
    this.gouter = gouter;
    this.specifite_gouter = specifite_gouter;
    this.localisation_repas = localisation_repas;
    this.specifite_resto_matin = specifite_resto_matin;
    this.menu_velours_soir = menu_velours_soir;
    this.specificite_diet_soir = specificite_diet_soir;
    this.specificite_resto_soir = specificite_resto_soir;
    this.convictions_alimentaires = convictions_alimentaires;
    this.allergie_intolerance = allergie_intolerance;
    this.autres_infos_utiles = autres_infos_utiles;
    this.texture_liquides_boissons = texture_liquides_boissons;
    this.nbr_mesurettes = nbr_mesurettes;
    this.temp_liquide_boisson = temp_liquide_boisson;
    this.site = site;


    // Update the checkboxOptions based on the selected texture and regime values
    this.options.forEach((option) => {
      if (option.type === 'texture') {
        option.checked = this.texture.includes(option.value);
      } else if (option.type === 'regime') {
        option.checked = this.regime.includes(option.value);
      } else if (option.type === 'soupe_midi') {
        option.checked = this.soupe_midi.includes(option.value);
      } else if (option.type === 'soupe_soir') {
        option.checked = this.soupe_soir.includes(option.value);
      } else if (option.type === 'convictions_alimentaires') {
        option.checked = this.convictions_alimentaires.includes(option.value);
      } else if (option.type === 'taille_portion') {
        option.checked = this.taille_portion.includes(option.value);
      }
    });

  }

  getOptions(type: OptionType): Option[] {
    return this.options.filter(option => option.type === type);
  }
  getTrimmedValues(data: string): string[] {
    return data.split(',').map(item => item.trim());
  }


}


