package server

import (
	"log"
	"math/rand"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

// RoomInfo represents information about a connection to a server and their participants
type RoomInfo struct {
	RoomID       string   `json:"room_id"`
	Host         bool     `json:"host"`
	Participants []string `json:"participants"`
}

// Participant describes a single entity in the hashmap
type Participant struct {
	Host bool
	Conn *websocket.Conn
}

// RoomMap is the main hashmap [roomID string] -> [[]Participant]
type RoomMap struct {
	Mutex sync.RWMutex
	Map   map[string][]Participant
}

// Init initialises the RoomMap struct
func (r *RoomMap) Init() {
	r.Map = make(map[string][]Participant)
}

// Get will return the array of participants in the room
func (r *RoomMap) Get(roomID string) []Participant {
	r.Mutex.RLock()
	defer r.Mutex.RUnlock()

	return r.Map[roomID]
}

func (r *RoomMap) GetRooms() []RoomInfo {

	var roomsInfo []RoomInfo

	AllRooms.Mutex.RLock()
	defer AllRooms.Mutex.RUnlock()

	for roomID, participants := range AllRooms.Map {
		var participantNames []string
		var isHost bool

		for _, participant := range participants {
			participantNames = append(participantNames, participant.Conn.RemoteAddr().String())

			// Check if the participant is the host
			if participant.Host {
				isHost = true
			}
		}

		roomsInfo = append(roomsInfo, RoomInfo{
			RoomID:       roomID,
			Host:         isHost,
			Participants: participantNames,
		})
	}

	return roomsInfo
}

// CreateRoom generate a unique room ID and return it -> insert it in the hashmap
func (r *RoomMap) CreateRoom() string {
	r.Mutex.Lock()
	defer r.Mutex.Unlock()

	rand.Seed(time.Now().UnixNano())
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
	b := make([]rune, 8)

	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}

	roomID := string(b)
	r.Map[roomID] = []Participant{}

	return roomID
}

// InsertIntoRoom will create a participant and add it in the hashmap
func (r *RoomMap) InsertIntoRoom(roomID string, host bool, conn *websocket.Conn) {
	r.Mutex.Lock()
	defer r.Mutex.Unlock()

	p := Participant{host, conn}

	log.Println("Inserting into Room with RoomID: ", roomID)
	r.Map[roomID] = append(r.Map[roomID], p)
}

// DeleteRoom deletes the room with the roomID
func (r *RoomMap) DeleteRoom(roomID string) {
	r.Mutex.Lock()
	defer r.Mutex.Unlock()

	delete(r.Map, roomID)
}
