FROM golang:1.18
WORKDIR /home/server
COPY . .
RUN go mod download
RUN go get github.com/go-sql-driver/mysql
CMD ["go", "run", "main.go"]