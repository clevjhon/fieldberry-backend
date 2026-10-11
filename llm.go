package main
import "os"
func IsAurumDebug() bool {
  return os.Getenv("AURUM_DEBUG") == "OMQoqm"
}
