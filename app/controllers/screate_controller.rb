class ScreateController < ApplicationController

  def top
    @text = params["text"]
    @names = params["name"]
    @colors = params["color"]
    @padding = params["padding"]
    unless @text.blank?
      @html_text = create()
    end
  end

  def create()
    @names = params["name"]
    @colors = params["color"]

    #スタイル指定
    table_text = "\n<style>\n"

    #テーブルレイアウト
    table_text += "td{padding:#{@padding.to_i}px;}\n"

    #文字色
    @colors.each{|c|
      if @colors[c.first] =~ /#000000/
        @colors.delete(c.first)
      else
        table_text += ".color-#{color_class(c.first)}{\n\tcolor:#{c[1]};\n}\n"
      end
      if @names[c.first] == ""
        @names.delete(c.first)
      end
    }


    table_text += "</style>\n"

    #配役入力欄作成
    table_text += "\n<textarea cols='50' rows='#{@names.length + 2}' name='haiyaku'>\n"
    @names.each{|n|
      table_text += "#{n[1]}：\n"
    }
    table_text += "\n</textarea><br>\n<br>\n"

    #テーブル作成
    table_text += "\n<table border='1'>\n"
    br_flag = false
    color_flag = false

    line_cnt = 1
    @text.lines{|t|
      t = t.gsub(/\R/, "")
      if br_flag
        table_text += "\t\t" + t.gsub(/\"/, "")
        if t =~ /\"/ 
          br_flag = false
          table_text += "</td>\n\t</tr>\n"
        else
          #セル内改行
          table_text += "<br>\n"
        end
      else
        
        if t =~ /^\t/ 
          table_text += "\t<tr>\n\t\t<td></td>\n"
        else
          table_text += "\t<tr>\n\t\t<td>#{sprintf("%03d",line_cnt)}</td>\n"
          line_cnt += 1
        end
        @names.each{|n|
          if t =~ /^#{@names[n.first]}/ || t =~ /\t#{@names[n.first]}\t/ || t =~ /\t#{@names[n.first]}M\t/ || t =~ /\t#{@names[n.first]}N\t/
            color_flag = true
            table_text += tab_to_td(t, n.first)
            break
          end
        }
        unless color_flag
          table_text += tab_to_td(t)
        end
        color_flag = false
        if t =~ /\"/ 
          #セル内がある時
          table_text += "<br>\n"
          br_flag = true
        else
          table_text += "</td>\n\t</tr>\n"
        end
      end

    }
    table_text += "</table>"

    return table_text
  end

  def tab_to_td(line, color = nil)
    change_text = ""
    if color && @colors[color]
      change_text = "\t\t<td class='color-#{color_class(color)}'>"
      change_text += line.gsub(/\t/, "</td>\n\t\t<td class='color-#{color_class(color)}'>")
    else
      change_text = "\t\t<td>"
      change_text += line.gsub(/\t/, "</td>\n\t\t<td>")
    end
    change_text = change_text.gsub(/\"/, "")

    return change_text
  end


  #デフォルトの色ではわかりやすいクラス名にする
  def color_class(color)
    case @colors[color]
    when "#000000"
      return "black"
    when "#ff0000"
      return "red"
    when "#0000ff"
      return "blue"
    when "#006600"
      return "green"
    when "#7e0021"
      return "brown"
    when "#9933ff"
      return "purple"
    when "#daa520"
      return "yellow"
    else
      return color
    end
  end

end
