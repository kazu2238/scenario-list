require 'open-uri'
require 'hpricot'
require 'kconv'

JERICHO_URL ="http://jerichof.web.fc2.com/scenari0/"
NISHITETU_URL = "http://jerichof.web.fc2.com/w/memo/"
LAVINA_URL = "http://jerichof.web.fc2.com/scenari0/la_viena/"

class ScenarioController < ApplicationController
  def top
  end

  def search
    @list = Hash.new()
    @scenario_num = []
    @scenario_list = params[:scenario_list]
    @output_num = params[:output_num]
    @num = params[:num].to_i
    @men = params[:men].to_i
    @women = params[:women].to_i
    @check = params[:check]
    @random_check = params[:random_check]
    @keyword = params[:keyword]
    case @scenario_list
    when "jericho941"
      jericho_scenario_search(JERICHO_URL+"top1897347f.htm")
    when "nishitetu"
      nishi_lavina_search(NISHITETU_URL + "itiran_all.htm")
    when "lavina"
      nishi_lavina_search(LAVINA_URL+"all.htm")
    when "news"
      jericho_scenario_search(JERICHO_URL+"news/top.htm")
    else
      scenario_put(JERICHO_URL+"top1897347f.htm")
    end
  end

  def faker
  end

  def fake_html
    url = params[:url]
    Dir::foreach('public/html') {|f|
      if f == "." || f == ".."
        next
      end
      if File.mtime("public/html/#{f}") < Time.now - 1800  
        File.unlink("public/html/#{f}")
      end
    }
    if File.exist?("public/html/#{url}")
      @html = File.read("public/html/#{url}").toutf8
    else
      redirect_to "/404.html"
    end
  end

  def fake
    url = params[:file_url]
    fake_url = url.split("/").pop.split("\.").first
    rand_name = html_edit(url)

    if url
      redirect_to "/fake_html/#{rand_name}-#{fake_url}"
    else
      redirect_to "/404.html"
    end
  end

  #シナリオ検索
  def jericho_scenario_search(page_url)

    if @men != 0 || @women != 0 || @num != 0
      flg = false
      cnt = 0
      writer = ""

      split_url = page_url.gsub(/#{JERICHO_URL}/,"")
      doc = Hpricot(open(page_url).read)
      case @scenario_list
      when "jericho941"
        contents = doc.to_html.gsub!(/(\w|\.)\n/, '\1')
        contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL}" + '\1' + "\"")
      when "news"
        contents = doc.to_html
        contents = contents.toutf8
        contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL.scrub}news/" + '\1' + "\"")
      end

      if @check == "true"
        pattern = member_pattern(@men, @women, @num)
      end

      contents.lines{|line| 
        if line.toutf8 =~ /.*岡崎二郎.*/ && flg == false || line.toutf8 =~ /HR/i && flg == false
          flg = true
        elsif flg == false
          next
        end
        if line.toutf8 =~ /この台本はヤフー/
          break
        end

        if /<p>.+<\/p>/ =~ line.toutf8
          cnt = cnt + 1
          @scenario_num << cnt
          writer = line.toutf8
          @list[cnt] =[writer, line.toutf8]
          next
        end
        if /\((#{@men}|#{zenhan(@men)})-(#{@women}|#{zenhan(@women)})-(#{@num}|#{zenhan(@num_zen)}")/ =~ line.toutf8 
          cnt = cnt + 1
          @scenario_num << cnt
          @list[cnt] =[writer, "<img src='/image/point017_02.gif'>#{line.toutf8.gsub(/\(\d.*\)/, " ")}" , scenario_retio(line.toutf8), member_sum(line.toutf8)]
          next
        end

        if @check == "true"
          #合計人で検索
          if @men == 0 && @women == 0
            if /\((\d*|[０-９]*)-(\d*|[０-９]*)-(\d*|[０-９]*)-(#{@num}|#{zenhan(@num)})\)/ =~ line.toutf8 
              @list[cnt] =[writer, "<img src='/image/point018_04.gif'>#{line.toutf8.gsub(/\(\d.*\)/, " ")}" , scenario_retio(line.toutf8), member_sum(line.toutf8)]
            end

            #融通をきかせた比率
          else
            pattern.each{|p|
              if /\(#{(p / 100)}-#{((p % 100) / 10)}-#{(p % 10)}/ =~ line.toutf8 
                cnt = cnt + 1
                @scenario_num << cnt
                @list[cnt] =[writer, "<img src='/image/point018_04.gif'>#{line.toutf8.gsub(/\(\d.*\)/, " ")}" , scenario_retio(line.toutf8), member_sum(line.toutf8)]
                break
              end
            }
          end
        end
      }

    else
      scenario_put(page_url)
    end

  end#jericho_scenario_search

  #西鉄,ラヴィーナシナリオ検索
  def nishi_lavina_search(page_url)

    cnt = 0

    if @check == "true"
      pattern = member_pattern(@men, @women, @num)
    end

    case @scenario_list
    when "nishitetu"
      @base_url = NISHITETU_URL
    when "lavina"
      @base_url = LAVINA_URL
    end

    doc = Hpricot(open(page_url).read)
    contents = (doc/:"table/tr") 
    contents.each{|content| 
      line = (content/:"td/p")
      if line[0] == nil
        next
      end
      if html_utf8(line[1]) == "ON-AIR" || html_utf8(line[1]) == "O.A.日"
        next
      else
        if @men != 0 || @women != 0 || @num != 0
          if html_utf8(line[4]).to_i == @men && html_utf8(line[5]).to_i == @women && html_utf8(line[6]).to_i == @num
            cnt = cnt + 1
            @scenario_num << cnt
            @list[cnt] = line
            next
          end

          if @check == "true"
            #合計人数で検索
            if @men == 0 && @women == 0
              if @num == html_utf8(line[7]).to_i
                cnt = cnt + 1
                @scenario_num << cnt
                @list[cnt] = line
              end

              #融通をきかせた比率
            else
              if @men + @women + @num == html_utf8(line[7]).to_i
                pattern.each{|p|
                  if html_utf8(line[4]).to_i == p/100 && html_utf8(line[5]).to_i == (p%100)/10 && html_utf8(line[6]).to_i == p%10
                    cnt = cnt + 1
                    @scenario_num << cnt
                    @list[cnt] = line
                    break
                  end
                }
              end
            end
          end
        else
          cnt = cnt + 1
          @scenario_num << cnt
          @list[cnt] = line
        end
      end
    }

  end#nishitetu_scenario_search()

  #融通を聞かせた時のパターン
  def member_pattern(men, women, num)

    pattern = []
    pattern << men * 100  + women * 10  + num
    (1..num).each{|i|
      pattern << (men + i) * 100 + women * 10 + (num - i)
      pattern << men * 100 + (women + i) * 10 + (num - i)
    }
    num2 = num
    m_men = men + num
    m_women = women
    w_men = men
    w_women = women + num
    while(num2 > 0)
      if m_men > men 
        m_men = m_men - 1
        m_women = m_women + 1
        pattern << (m_men) * 100 + (m_women) * 10 + (num - num2)
      end
      if w_women > women
        w_men = w_men + 1
        w_women = w_women - 1
        pattern << (w_men) * 100 + (w_women) * 10 + (num - num2)
      end
      if w_women <= women && m_men <= men
        num2 = num2 - 1
        m_men = men + num2
        m_women = women
        w_men = men
        w_women = women + num2
      end
    end

    (1..men).each{|m|
      pattern << (men - m) * 100 + women * 10 + (num + m)
      (1..women).each{|w|
        pattern << (men - m) * 100 + (women - w) * 10 + (num + w + m) 
      }
    }
    (1..women).each{|w|
      pattern << men * 100 + (women - w) * 10 + (num + w) 
    }

    return(pattern.uniq)

  end#member_pattern()

  def scenario_retio(title)

    /\((\d*|[０-９]*)-(\d*|[０-９]*)-(\d*|[０-９]*)/ =~ title
    retio = "<font color=\"blue\">#{$1.to_s}</font>:<font color=\"#DF01D7\">#{$2.to_s}</font>:#{$3.to_s}"
    return(retio)

  end

  def member_sum(title)
    /\((\d*|[０-９]*)-(\d*|[０-９]*)-(\d*|[０-９]*)/ =~ title
    sum = $1.to_i + $2.to_i + $3.to_i
    return(sum)

  end

  def zenhan(str)
    return(str.to_s.tr!("0-9", "０-９"))
  end

  #全シナリオ出力
  def scenario_put(page_url)
    flg = false
    cnt = 0
    writer = ""

    split_url = page_url.gsub(/#{JERICHO_URL}/,"")
    doc = Hpricot(open(page_url).read)
    if @scenario_list == "news"
      contents = doc.to_html
      contents = contents.toutf8
      contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL.scrub}news/" + '\1' + "\"")
    else
      contents = doc.to_html.gsub!(/(\w|\.)\n/, '\1')
      contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL}" + '\1' + "\"")
    end

    contents.lines{|line| 
      if line.toutf8 =~ /.*岡崎二郎.*/ && flg == false  || line.toutf8 =~ /HR/i && flg == false && @scenario_list == "news"
        flg = true
      elsif flg == false
        next
      end
      if line.toutf8 =~ /この台本はヤフー/
        break
      end
      if /<p>.+<\/p>/ =~ line.toutf8
        cnt = cnt + 1
        @scenario_num << cnt
        writer = line.toutf8
        @list[cnt] = [writer, line.toutf8]
      elsif line.toutf8 =~ /\(\d.*\)/ 
        cnt = cnt + 1
        @scenario_num << cnt
        @list[cnt] = [writer, line.toutf8.gsub(/\(\d.*\)/, "") , scenario_retio(line.toutf8), member_sum(line.toutf8)]
      end
    }

  end#scenario_put

  def html_utf8(elem)
    return(elem.inner_html.toutf8)
  end#html_utf8

  #####fake htmlの作成・更新#####
  def html_edit(url)
    name = rand(100) + 1
    if url != ""
      begin
      doc = Hpricot(open(url).read)
      rescue => e
        return false
      end
      File::open("public/html/#{name}-#{url.split("/").pop.split("\.").first}", 'w').puts doc
    end
    return name
  end #html_edit()
end
