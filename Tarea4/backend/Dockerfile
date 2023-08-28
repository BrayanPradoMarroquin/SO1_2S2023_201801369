FROM golang:1.21

WORKDIR /go_Modules

COPY . ./

RUN go mod download

CMD ["go", "run", "main.go"]