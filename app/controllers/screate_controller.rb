class ScreateController < ApplicationController

  def top
    @text = params["text"]
    @names = params["name"]
    @colors = params["color"]
    @sex = params["sex"]
    @padding = params["padding"]
    @style_change = params["style_change"]
    @name_cnt = {}

    if @names.present?
      @names.each{|n|
        if n[1]== ""
          @names.delete(n.first)
          @sex.delete(n.first)
          @colors.delete(n.first)
        else
          @name_cnt.store(n.first , 0)
        end
      }
    end

    if @text.present?
      @html_text = create()
    end
  end

  def create()
    men = 0
    women = 0
    humon = 0

    #比率
    @sex.each{|s|
      case s[1]
      when "men"
        men += 1
      when "women"
        women += 1
      when "humon"
        humon += 1
      end
    }

    #スタイル指定
    table_text = "\n<style>\n"

    #テーブルレイアウト
    if @style_change.present?
      table_text += "table{ border: 0px; border-right: 1px dotted #DCDCDC; border-collapse: collapse;\n\tborder-spacing: 0px;\n}"
      table_text += "td{ border-right: 0px; border-left: 0px; border-bottom: 1px solid #A9A9A9;}\n"
      table_text += "td:nth-of-type(1){ background-color: #DCDCDC;border-right: 1px solid #A9A9A9;}"
      table_text += "td:nth-of-type(2){ background-color: #F5F5F5;border-right: 1px solid #A9A9A9;}\n"
    end
    if @padding.to_i != 0
      table_text += "td{padding:#{@padding.to_i}px;}\n"
    end

    #文字色
    @colors.each{|c|
      if @colors[c.first] =~ /#000000/
        @colors.delete(c.first)
      else
        table_text += ".color-#{color_class(c.first)}{\n\tcolor:#{c[1]};\n}\n"
      end
    }

    table_text += "</style>\n"

    table_text += "<strong>&#9794;#{men} &#9792;#{women} 不問#{humon} 計#{men+women+humon}</strong><br>\n<br>\n登場人物<small>&lt;総セリフ数：(serif-sum)&gt;</small><br>\n<br>\n"
    @names.each{|n|
      table_text += "<strong class='color-#{color_class(n.first)}'>#{n[1]}</strong>（#{sex_icon(@sex[n.first])}）<small>&lt;セリフ数：(serif-#{n.first})&gt;</small><br>\n<br>\n"
    }
    #配役入力欄作成
    table_text += "\n<textarea cols='50' rows='#{@names.length + 2}' name='haiyaku'>"
    @names.each{|n|
      table_text += "#{n[1]}(#{sex_icon(@sex[n.first])})：\n"
    }
    table_text += "</textarea><br>\n<br>\n"

    #テーブル作成
    table_text += "\n<table border='1'>\n"
    br_flag = false
    color_flag = false

    line_cnt = 1
    @text.lines{|line|
      line = line.gsub(/\R/, "")
      if br_flag
        table_text += "\t\t" + line.gsub(/\"/, "")
        if line =~ /\"/ 
          br_flag = false
          table_text += "</td>\n\t</tr>\n"
        else
          #セル内改行
          table_text += "<br>\n"
        end
      else
        
        if line =~ /^\t/ 
          table_text += "\t<tr>\n\t\t<td></td>\n"
        else
          table_text += "\t<tr>\n\t\t<td>#{sprintf("%03d",line_cnt)}</td>\n"
          line_cnt += 1
        end
        @names.each{|n|
          if line =~ /^#{n[1]}/ || line =~ /\t#{n[1]}\t/ || line =~ /\t#{n[1]}M\t/ || line =~ /\t#{n[1]}N\t/
            color_flag = true
            table_text += tab_to_td(line, n.first)
            @name_cnt[n.first] += 1
            break
          end
        }
        unless color_flag
          table_text += tab_to_td(line, nil)
        end
        color_flag = false
        if line =~ /\"/ 
          #セル内がある時
          table_text += "<br>\n"
          br_flag = true
        else
          table_text += "</td>\n\t</tr>\n"
        end
      end
    }
    table_text += "</table>"

    table_text = table_text.gsub(/\(serif-sum\)/, (line_cnt - 1).to_s)
    @names.each{|n|
      table_text = table_text.gsub(/\(serif-#{n.first}\)/, @name_cnt[n.first].to_s)
    }

    return table_text
  end

  def tab_to_td(line, color = nil )
    change_text = ""
    if color && @colors[color]
      change_text = "\t\t<td class='color-#{color_class(color)}'>"
      change_text += line.gsub(/\t/, "</td>\n\t\t<td class='color-#{color_class(color)}'>")
    else
      change_text = "\t\t<td>"
      puts line
      if line =~ /^\t/
      change_text += line.gsub(/\t/, "</td>\n\t\t<td style='font-size:14px;font-style:oblique'>")
      else
      change_text += line.gsub(/\t/, "</td>\n\t\t<td>")
      end
    end
    change_text = change_text.gsub(/\"/, "")

    return change_text
  end

  #性別の記号を取得
  def sex_icon(sex)
    case sex
    when "men"
      return "&#9794;"
    when "women"
      return "&#9792;"
    when "humon"
      return "不問"
    end
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
