🔗 WebRTC Peer-to-Peer Video Calling (Socket.IO Signaling)

A backend-heavy, real-time WebRTC project that demonstrates networking fundamentals, browser APIs, and distributed system coordination — not a CRUD app.

This project implements peer-to-peer video calling using WebRTC with Socket.IO as the signaling layer, focusing on correct connection sequencing, ICE handling, and media lifecycle management.

🚀 Why This Project Is Strong

This project intentionally goes beyond basic tutorials and demonstrates:

Networking knowledge

ICE candidate exchange

STUN-based NAT traversal

Peer-to-peer media paths

Systems design thinking

Decoupled signaling vs media plane

Room-based peer coordination

Event-driven state transitions

Security awareness

No media flows through the server

Server acts only as a signaling relay

Browser permission-gated media access

Real browser APIs

RTCPeerConnection

MediaStream / getUserMedia

ICE lifecycle events

This is the kind of project that signals real backend + real-time engineering ability.

🧠 High-Level Architecture
Browser A  ──┐
            │  (Signaling: offer / answer / ICE)
            ▼
       Socket.IO Server
            ▲
            │
Browser B  ──┘

Media (audio/video):
Browser A  <=====================>  Browser B
           (Direct P2P via WebRTC)

Key Principle

Signaling uses WebSockets

Media never touches the server
