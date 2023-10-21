package main

import (
	"context"
	"github.com/alex-kuck/hello.wails/internal"
	"github.com/alex-kuck/hello.wails/internal/sw"
	"github.com/labstack/gommon/log"
	"net/http"
	"time"
)

// App struct
type App struct {
	ctx   context.Context
	swapi *internal.SwAPI
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		swapi: internal.NewSwAPI(http.DefaultClient),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetPlanets returns available Star Wars planets
func (a *App) GetPlanets() ([]sw.Planet, error) {
	ctxWithTimeout, cancel := context.WithTimeout(a.ctx, time.Second*10)
	defer cancel()

	planets, err := a.swapi.GetPlanets(ctxWithTimeout)
	if err != nil {
		log.Errorf("could not get planets: %v", err)
	}
	return planets, err
}
