package main
import (
  "github.com/joho/godotenv"
 "encoding/json"
 "fmt"
 "log"
 "net/http"
 "os"
 "time"
)
func main(){
 _=godotenv.Load()

 mux:=http.NewServeMux()
 mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type","application/json")
  json.NewEncoder(w).Encode(map[string]any{"status":"ok","service":"fieldberry-backend-go","plan":14948,"release":"v14-exe-133","time":time.Now().UTC()})
 })
 mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request){
  json.NewEncoder(w).Encode(map[string]any{"ok":true,"plan":14948,"release":"v14-exe-133"})
 })
 mux.HandleFunc("/api/bom", func(w http.ResponseWriter, r *http.Request){
  json.NewEncoder(w).Encode(map[string]any{"SRT-Legal":"ok","SRT-Diner":"ok","SRT-Trading":"ok"})
 })
 mux.HandleFunc("/api/github/setup", func(w http.ResponseWriter, r *http.Request){
  plan:=r.URL.Query().Get("plan_id"); if plan==""{plan="14948"}
  w.Header().Set("Content-Type","text/html")
  fmt.Fprintf(w,"<h1>Go Host Plan %s OK</h1><a href=/releases/fieldberry-v14-exe-133.exe>Download</a>",plan)
 })
 mux.HandleFunc("/api/github/webhook", func(w http.ResponseWriter, r *http.Request){
  json.NewEncoder(w).Encode(map[string]any{"ok":true,"plan":14948})
 })
 mux.Handle("/releases/", http.StripPrefix("/releases/", http.FileServer(http.Dir("releases"))))
 port:=os.Getenv("PORT"); if port==""{port="8082"}
 log.Printf("Go host 14948 on :%s",port)
 log.Fatal(http.ListenAndServe(":"+port,mux))
}

func init(){
  // white live handler
}
