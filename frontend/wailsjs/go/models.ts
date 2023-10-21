export namespace sw {
	
	export class Planet {
	    name: string;
	    rotation_period: string;
	    orbital_period: string;
	    diameter: string;
	    climate: string;
	    gravity: string;
	    terrain: string;
	    surface_water: string;
	    population: string;
	    residents: string[];
	    films: string[];
	    // Go type: time
	    created: any;
	    // Go type: time
	    edited: any;
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new Planet(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.rotation_period = source["rotation_period"];
	        this.orbital_period = source["orbital_period"];
	        this.diameter = source["diameter"];
	        this.climate = source["climate"];
	        this.gravity = source["gravity"];
	        this.terrain = source["terrain"];
	        this.surface_water = source["surface_water"];
	        this.population = source["population"];
	        this.residents = source["residents"];
	        this.films = source["films"];
	        this.created = this.convertValues(source["created"], null);
	        this.edited = this.convertValues(source["edited"], null);
	        this.url = source["url"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

