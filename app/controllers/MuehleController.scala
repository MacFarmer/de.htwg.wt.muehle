package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.muehle.Muehle


@Singleton
class MuehleController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gameController = Muehle.controller
  def muehleAsText =  gameController.status + "\n" + gameController.gridToString

  def about= Action {
    Ok(views.html.index())
  }

  def muehle = Action {
    Ok(muehleAsText)
  }

  def place(pos:Int) = Action {
    gameController.placeStone(pos)
    Ok(views.html.muehle(gameController))
  }

  def newGame = Action {
    gameController.newGame()
    Ok(muehleAsText)
  }

  def undo = Action {
    gameController.undo
    Ok(views.html.muehle(gameController))
  }

  def redo = Action {
    gameController.redo
    Ok(views.html.muehle(gameController))
  }
  def history= Action {
    Ok(views.html.history())
  }

//   def muehle = Action {
//    Ok(muehleAsText)
//  }
}