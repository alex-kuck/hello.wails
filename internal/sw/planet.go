package sw

import "time"

type Planet struct {
	Id             int
	Name           string    `json:"name"`
	RotationPeriod string    `json:"rotation_period"`
	OrbitalPeriod  string    `json:"orbital_period"`
	Diameter       string    `json:"diameter"`
	Climate        string    `json:"climate"`
	Gravity        string    `json:"gravity"`
	Terrain        string    `json:"terrain"`
	SurfaceWater   string    `json:"surface_water"`
	Population     string    `json:"population"`
	Residents      []string  `json:"residents"`
	Films          []string  `json:"films"`
	Created        time.Time `json:"created"`
	Edited         time.Time `json:"edited"`
	Url            string    `json:"url"`
}

type PlanetsResponse struct {
	Count int `json:"count"`

	Next     *string  `json:"next"`
	Previous *string  `json:"previous"`
	Results  []Planet `json:"results"`
}
