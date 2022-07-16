import { Component, Input, OnInit } from '@angular/core';
import { SquareEnum } from '../square/squareEnum';

@Component( {
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
} )
export class BoardComponent implements OnInit
{
  @Input() public piece: SquareEnum = SquareEnum.Empty;
  @Input() public row!: Number;
  @Input() public col!: Number;
  private currentPlayer!: SquareEnum;
  public board!: SquareEnum[][];
  private isGameOver!: boolean;
  public statusMessage!: string;

  constructor () { }

  ngOnInit (): void
  {
    this.newGame();
  }

  get gameOver (): boolean
  {
    return this.isGameOver;
  }

  newGame ()
  {
    this.board = [];
    for ( let row = 0; row < 3; row++ )
    {
      this.board[row] = [];
      for ( let col = 0; col < 3; col++ )
      {
        this.board[row][col] = SquareEnum.Empty;
      }
    }
    this.currentPlayer = SquareEnum.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${ this.currentPlayer }'s turn.`
  }

  move ( row: number, col: number ): void
  {
    if ( !this.isGameOver && this.board[row][col] === SquareEnum.Empty )
    {
      this.board[row][col] = this.currentPlayer;
    }
    if ( this.isDraw() )
    {
      this.statusMessage = 'It\'s a Draw!';
      this.isGameOver = true;
    } else if ( this.isWin() )
    {
      this.statusMessage = `Player ${ this.currentPlayer } won!`;
      this.isGameOver = true;
    } else
    {
      this.currentPlayer = this.currentPlayer === SquareEnum.X ? SquareEnum.O : SquareEnum.X;
    }
  }
  isDraw (): boolean
  {
    for ( const columns of this.board )
    {
      for ( const col of columns )
      {
        if ( col === SquareEnum.Empty )
        {
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin (): boolean
  {
    // Horizontal
    for ( const columns of this.board )
    {
      if ( columns[0] === columns[1] && columns[0] === columns[2] && columns[0] !== SquareEnum.Empty )
      {
        return true;
      }
    }

    // Vertical
    for ( let col = 0; col < this.board[0].length; col++ )
    {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] !== SquareEnum.Empty
      )
      {
        return true;
      }
    }

    // Diagonals
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== SquareEnum.Empty
    )
    {
      return true;
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][2] &&
      this.board[0][2] !== SquareEnum.Empty
    )
    {
      return true;
    }
    return false;
  }
}
