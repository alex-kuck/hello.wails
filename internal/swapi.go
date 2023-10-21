package internal

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/alex-kuck/hello.wails/internal/sw"
	"log"
	"net/http"
	"regexp"
	"strconv"
)

type SwAPI struct {
	client *http.Client
}

func NewSwAPI(client *http.Client) *SwAPI {
	return &SwAPI{client: client}
}

const (
	apiUrl = "https://swapi.dev/api"
)

var (
	idRegEx = regexp.MustCompile("(?s)^.*/(\\d+)/?$")
)

func (api *SwAPI) GetPlanets(ctx context.Context) ([]sw.Planet, error) {
	log.Printf("start fetching planets")
	request, err := planetsRequest(ctx)
	if err != nil {
		return nil, fmt.Errorf("could not create request: %v", err)
	}

	res, err := api.client.Do(request)
	if err != nil {
		return nil, fmt.Errorf("could not get /planets: %v", err)
	}

	defer res.Body.Close()
	planetsRes := &sw.PlanetsResponse{}
	err = json.NewDecoder(res.Body).Decode(&planetsRes)
	if err != nil {
		return nil, fmt.Errorf("could not parse planets response: %v", err)
	}

	for idx, p := range planetsRes.Results {
		id, err := extractIdFromUrl(p.Url)
		if err != nil {
			fmt.Printf("could not parse ID: %v", err)
		}

		planetsRes.Results[idx].Id = int(id)
	}
	return planetsRes.Results, nil
}

func extractIdFromUrl(url string) (int64, error) {
	matches := idRegEx.FindStringSubmatch(url)
	if len(matches) != 2 {
		return 0, fmt.Errorf("could not determine ID for url=%s", url)
	}

	id, err := strconv.ParseInt(matches[1], 10, 0)
	return id, err
}

func planetsRequest(ctx context.Context) (*http.Request, error) {
	request, err := http.NewRequest(http.MethodGet, apiUrl+"/planets", nil)
	request = request.WithContext(ctx)
	return request, err
}
